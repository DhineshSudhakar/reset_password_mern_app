import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const email = req.body.email;
    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (email === decodedData.email) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
