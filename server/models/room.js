import mongoose from "mongoose";
import Message from "./message.js";

const roomSchema = mongoose.Schema({
  id: { type: String },
  users: [{ userId: String, userName: String }],
  messages: [Message],
  UpdatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Room", roomSchema);
