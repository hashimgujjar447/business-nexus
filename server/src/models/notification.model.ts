import mongoose, { Schema, Document } from "mongoose";

export type NotificationType =
  | "request"
  | "request_accepted"
  | "request_rejected"
  | "message";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;

  title: string;

  message: string;

  type: NotificationType;

  isRead: boolean;

  relatedRequestId?: mongoose.Types.ObjectId;

  relatedUserId?: mongoose.Types.ObjectId;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["request", "request_accepted", "request_rejected", "message"],
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    relatedRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },

    relatedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({
  userId: 1,
  createdAt: -1,
});

const NotificationModel = mongoose.model<INotification>(
  "Notification",
  notificationSchema,
);

export default NotificationModel;
