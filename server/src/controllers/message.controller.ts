import { Request, Response } from "express";
import Message from "../models/message.model";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const senderId = req.user?._id;
    const receiverId = req.params.receiverId; // corrected this line
    const { message } = req.body;

    if (!message || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Message and receiverId are required",
      });
    }

    const createdMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: {
        _id: createdMessage._id,
        senderId: {
          _id: createdMessage.senderId,
        },
        receiverId: createdMessage.receiverId,
        message: createdMessage.message,
        createdAt: createdMessage.createdAt,
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const senderId = req.user?._id;
    const receiverId = req.params.receiverId;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "receiverId is required",
      });
    }

    const findMessages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    })
      .sort({ createdAt: 1 }) // oldest to newest
      .populate("senderId", "name avatar") // optional: populate sender info
      .populate("receiverId", "name avatar"); // optional: populate receiver info

    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: findMessages,
    });
  } catch (error) {
    console.error("Error finding messages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve messages",
    });
  }
};
