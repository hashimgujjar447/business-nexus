// models/collaborationRequest.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICollaborationRequest extends Document {
  investor: mongoose.Types.ObjectId;
  entrepreneur: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

const CollaborationRequestSchema = new Schema<ICollaborationRequest>(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    entrepreneur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model<ICollaborationRequest>(
  "CollaborationRequest",
  CollaborationRequestSchema,
);
