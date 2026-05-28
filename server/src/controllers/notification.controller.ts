import { Request, Response } from "express";

import NotificationModel from "../models/notification.model";

// ========================================
// Get My Notifications
// ========================================

export const getMyNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const notifications = await NotificationModel.find({
      userId,
    })
      .populate("relatedUserId", "name avatar role")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching notifications",
    });
  }
};

// ========================================
// Mark Notification As Read
// ========================================

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;

    const notification = await NotificationModel.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
      },
      {
        new: true,
      },
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating notification",
    });
  }
};
