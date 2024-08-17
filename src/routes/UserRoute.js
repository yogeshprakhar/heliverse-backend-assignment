import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    user = new User(req.body);
    user.save();

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
    });
    return res.status(200).send({ message: "user register ok" });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "something went wrong while register" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email,"email")
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);

    res.cookie("auth_token", token, {
      httpOnly: true,
    });
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log("Error while login", error);
    res.status(500).json({ message: "error while login user" });
  }
});

export default router
