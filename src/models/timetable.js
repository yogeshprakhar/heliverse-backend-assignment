import mongoose, { Schema } from "mongoose";

const timetableSchema = new mongoose.Schema({
  period: [
    {
      periodNumber: {
        type: Number,
        required: true,
      },
      periodName: {
        type: String,
        required: true,
      },
      startTime: {
        type: String, // You can use String to store time in "HH:MM AM/PM" format
        required: true,
      },
      endTime: {
        type: String, // You can use String to store time in "HH:MM AM/PM" format
        required: true,
      },
    },
  ],
  assignClass: {
    type: Schema.Types.ObjectId,
    ref: "Class",
  },
});

const TimeTable = mongoose.model("TimeTable", timetableSchema);
export default TimeTable;
