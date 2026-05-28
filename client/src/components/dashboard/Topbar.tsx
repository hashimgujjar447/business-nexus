import { useEffect, useRef, useState } from "react";

import { Bell } from "lucide-react";

import { useAppSelector } from "../../hooks/useTypedHooks";

import {
  getAllNotifications,
  updateNotificationStatus,
} from "../../api/notification.api";

import socket from "../../utils/socket";

const Topbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [notifications, setNotifications] = useState<any[]>([]);

  const [notificationsLength, setNotificationsLength] = useState<number>(0);

  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

  // ========================================
  // Real Time Notifications
  // ========================================

  useEffect(() => {
    const handleNotification = (data: any) => {
      console.log("NEW NOTIFICATION:", data);

      setNotifications((prev) => {
        const alreadyExists = prev.some(
          (notification) => notification._id === data._id,
        );

        if (alreadyExists) {
          return prev;
        }

        return [data, ...prev];
      });

      setNotificationsLength((prev) => prev + 1);
    };

    socket.on("receive_notification", handleNotification);

    return () => {
      socket.off("receive_notification", handleNotification);
    };
  }, []);

  // ========================================
  // Fetch Notifications
  // ========================================

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getAllNotifications();

        const notificationsData = response.data.data || [];

        setNotifications(notificationsData);

        const unreadNotifications = notificationsData.filter(
          (notification: any) => !notification.isRead,
        );

        setNotificationsLength(unreadNotifications.length);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  // ========================================
  // Open Notification Dropdown
  // ========================================

  const handleNotificationToggle = async () => {
    const newState = !showNotifications;

    setShowNotifications(newState);

    if (newState) {
      try {
        const unreadNotifications = notifications.filter(
          (notification) => !notification.isRead,
        );

        await Promise.all(
          unreadNotifications.map((notification) =>
            updateNotificationStatus(notification._id),
          ),
        );

        const updatedNotifications = notifications.map((notification) => ({
          ...notification,
          isRead: true,
        }));

        setNotifications(updatedNotifications);

        setNotificationsLength(0);
      } catch (error) {
        console.error("Failed to update notifications", error);
      }
    }
  };

  // ========================================
  // Close On Outside Click
  // ========================================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 hidden md:flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="flex items-center gap-6">
        {/* Notifications */}

        <div className="relative" ref={notificationRef}>
          <button
            onClick={handleNotificationToggle}
            className="relative flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <Bell className="w-6 h-6 text-gray-700" />

            {notificationsLength > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-semibold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow">
                {notificationsLength}
              </span>
            )}
          </button>

          {/* Dropdown */}

          {showNotifications && (
            <div className="absolute top-14 right-0 w-[370px] bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Header */}

              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">
                  Notifications
                </h2>

                <span className="text-xs text-gray-500">
                  {notifications.length} Total
                </span>
              </div>

              {/* List */}

              <div className="max-h-[420px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-12 px-6 text-center">
                    <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />

                    <p className="text-sm text-gray-500">
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <div
                      key={notification._id || index}
                      className={`px-5 py-4 border-b border-gray-100 transition-all duration-200 hover:bg-gray-50 ${
                        !notification.isRead ? "bg-blue-50/60" : "bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Blue Dot */}

                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                        )}

                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {notification.title}
                          </h3>

                          <p className="text-xs text-gray-500 leading-relaxed mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User */}

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{user?.name}</p>

            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>

          <img
            src={user?.avatar || "https://i.pravatar.cc/40"}
            alt="avatar"
            className="w-11 h-11 rounded-full object-cover border border-gray-200 shadow-sm"
          />
        </div>
      </div>
    </header>
  );
};
export default Topbar;
