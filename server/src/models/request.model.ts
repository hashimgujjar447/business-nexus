import mongoose, { Schema, Document } from "mongoose";

export type RequestStatus = "pending" | "accepted" | "rejected";

export interface IRequest extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;

  message?: string;

  status: RequestStatus;

  isRead: boolean;
}

const requestSchema = new Schema<IRequest>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      trim: true,
      maxLength: 500,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

requestSchema.index(
  {
    senderId: 1,
    receiverId: 1,
  },
  {
    unique: true,
  },
);

const RequestModel = mongoose.model<IRequest>("Request", requestSchema);

export default RequestModel;
