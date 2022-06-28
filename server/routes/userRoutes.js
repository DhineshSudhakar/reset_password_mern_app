import express from "express";
import { genSalt, hash, compare } from "bcrypt";
import uniqid from "uniqid";
import path from "path";

import {
  createJwtToken,
  findUser,
  findUserAndToken,
  genHashPassword,
  updateUser,
  updateUserPassword,
  userSignup,
} from "./helper.js";
import { genMail } from "../mailer.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isUserExists = await findUser(email);
    if (isUserExists) {
      res.status(401).send({ msg: "User already exists" });
    } else {
      const hashPassword = await genHashPassword(password);
      const data = {
        name,
        email,
        hashPassword,
        id: uniqid(),
        createdAt: new Date(),
      };
      const result = await userSignup(data);
      const token = createJwtToken({ email, name, createdAt: new Date() });
      res.send({ msg: "User create successfully", result, token });
    }
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

router.post("/login", auth, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUser(email);
    if (user) {
      const isPasswordMatch = await compare(password, user.hashPassword);
      if (isPasswordMatch) {
        res.send({ msg: "login successfully" });
      } else {
        res.status(401).send({ msg: "Invalid credentials" });
      }
    } else {
      res.status(401).send({ msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

router.put("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const resetlink = path.join("http://localhost:4000/user", "/reset-password");
  const random_string = (
    Math.floor(Math.random() * 900000) + 100000
  ).toString();
  try {
    const user = await findUser(email);
    if (user) {
      const result = await updateUser(email, random_string);
      await genMail(email, resetlink, random_string);
      res.send({ msg: "Verify your email for verification code", result });
    } else {
      res.status(401).send({ msg: "No user found" });
    }
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

router.put("/reset-password", async (req, res) => {
  const { email, token } = req.body;
  try {
    const user = await findUser(email);
    if (user) {
      const isTokenMatches = await findUserAndToken(email, token);
      if (isTokenMatches) {
        res.send({ msg: "user verified successfully" });
      } else {
        res.status(401).send({ msg: "Invalid code try again" });
      }
    } else {
      res.status(401).send({ msg: "No user found" });
    }
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

router.put("/change-password", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashPassword = await genHashPassword(password);
    const result = await updateUserPassword(email, password);
    const user = await findUser(email);
    const token = createJwtToken({
      email,
      name: user.name,
      createdAt: new Date(),
    });
    res.send({ msg: "Password changed successfully", result, token });
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

export const userRoutes = router;
