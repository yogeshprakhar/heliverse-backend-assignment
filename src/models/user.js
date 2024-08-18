import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  isPrincipal: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["teacher", "student"]
  },
  assignClass: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
});

userSchema.pre("save",async function (next) {
    if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  })

const User = mongoose.model("User", userSchema);
export default User;
