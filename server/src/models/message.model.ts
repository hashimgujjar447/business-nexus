import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  message: string;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
