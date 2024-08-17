import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  schedule: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    startTime: {
      type: String,  // You can use String to store time in "HH:MM AM/PM" format
      required: true,
    },
    endTime: {
      type: String,  // You can use String to store time in "HH:MM AM/PM" format
      required: true,
    },
  }],
  timetable: [
    {
      type: Schema.Types.ObjectId,
      ref: "TimeTable",
    },
  ],
  assignStudent: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Class = mongoose.model("Class", classSchema);
export default Class;
