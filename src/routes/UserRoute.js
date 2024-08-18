import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { verifyJWT } from "../middlewares/jwtCheck.js";

const router = express.Router();

router.post("/register",verifyJWT, async (req, res) => {
  try {
    //todo - add check if user is student and creating user
    //todo - add check if user is teacher and creating teacher
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    user = new User(req.body);
    await user.save();

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
      secure:true,
    });
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log("Error while login", error);
    res.status(500).json({ message: "error while login user" });
  }
});

router.get('/alluser',verifyJWT,async(req,res)=>{
  try {
    console.log(req.userId); 
  let user = await User.findById(req.userId);
  let users = await User.find()
  if(!user.isPrincipal){
    users = users.filter((data) => data.role == "student")
  }
  //  console.log(users)
  res.status(200).json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error while fetching All users'});
  }
})

router.get("/getCurrentUser",verifyJWT,async(req,res)=>{
  try {
    let user = await User.findById(req.userId);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error while fetching current user'});
  }
})

router.put("/:userId",verifyJWT,async(req,res)=>{
  // todo- if user is student or not
  console.log("this is param id",req.params.userId)
  try {
    let user = await User.findByIdAndUpdate(req.params.userId,req.body)
    console.log(user)
    return res.status(200).send({ message: "user updated ok" });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "something went wrong while updating" });
  }
})

router.get("/getUser/:userId",verifyJWT,async(req,res)=>{
  try {
    let user = await User.findById(req.params.userId)
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "something went wrong while getting user" });
  }
})

export default router
