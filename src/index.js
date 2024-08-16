import express from "express"
import mongoose from "mongoose";
import "dotenv/config.js"
import cors from "cors"
import cookieParser from "cookie-parser";

// mongoose
//   .connect(process.env.MONGODB_CONNECTION_STRING as string)
//   .then(() => console.log("connected to database"))
//   .catch((e) => console.log("Error occured", e));

const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.listen(8000,()=>{
    console.log("server started at localhost 8000")
})