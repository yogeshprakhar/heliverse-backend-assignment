import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Class from "../models/classroom.js" 
import jwt from "jsonwebtoken";

import { verifyJWT } from "../middlewares/jwtCheck.js";

const router = express.Router();

router.post("/register",verifyJWT,async(req,res)=>{
    // todo - check if user is principal or not
    console.log(req.body);
    let classroom = await Class.findOne({name:req.body.name});
    if (classroom) {
        return res.status(400).json({ message: "Classroom already exist" });
    }
    try {
        classroom = new Class(req.body)
        await classroom.save();
        return res.status(200).send({ message: "ClassRoom created ok" });
    } catch (error) {ster
        console.log("classroom creation failure",error)
    }
})

router.get("/classrooms",verifyJWT,async(req,res)=>{
    let user = await User.findById(req.userId)
    if(user?.isPrincipal){
        let classrooms = await Class.find();
        console.log("here")
        console.log(classrooms)
        return res.status(200).json(classrooms)
    }
    if(user?.assignClass.length == 1){
        console.log("here when one")
        let classroom = await Class.findById(user?.assignClass[0])
        console.log(classroom)
        return res.status(200).json(classroom)
    }
})
export default router