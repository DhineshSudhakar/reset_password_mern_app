import { client } from "../index.js";
import jwt from "jsonwebtoken";
import { genSalt, hash } from "bcrypt";

export function userSignup(data) {
  return client
    .db("password_reset_api")
    .collection("users")
    .insertOne({
      ...data,
    });
}

export function findUser(email) {
  return client
    .db("password_reset_api")
    .collection("users")
    .findOne({ email: email });
}

export function findUserAndToken(email, token) {
  return client
    .db("password_reset_api")
    .collection("users")
    .findOne({ email: email, random_string: token });
}

export function updateUser(email, rString) {
  const expiresIn = new Date();
  expiresIn.setHours(expiresIn.getHours() + 1);
  return client
    .db("password_reset_api")
    .collection("users")
    .updateOne(
      { email: email },
      {
        $set: {
          random_string: rString,
          random_string_expires_in: expiresIn,
        },
      }
    );
}

export function updateUserPassword(email, password) {
  return client
    .db("password_reset_api")
    .collection("users")
    .updateOne(
      { email: email },
      {
        $set: {
          hashPassword: password,
        },
      }
    );
}

export async function genHashPassword(password) {
  const noOfRounds = 10;
  const salt = await genSalt(noOfRounds);
  const hashPassword = await hash(password, salt);
  return hashPassword;
}

export function createJwtToken(payload) {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
}
