import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";

import { userRoutes } from "./routes/userRoutes.js";
import { genMail } from "./mailer.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function connectToMongo() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("server connected to MongoDB");
  return client;
}

export const client = await connectToMongo();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to password reset api 🎉");
});

app.use("/user", userRoutes);

app.listen(PORT, () =>
  console.log("server successfully running on port:", PORT)
);
