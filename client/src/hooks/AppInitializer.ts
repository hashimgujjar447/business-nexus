import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./useTypedHooks";

import { fetchCurrentUser } from "../features/auth/authSlice";

import socket from "../utils/socket";

const AppInitializer = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  // ========================================
  // Restore User On Refresh
  // ========================================

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // ========================================
  // Global Socket Connection
  // ========================================

  useEffect(() => {
    if (user?._id) {
      if (!socket.connected) {
        socket.connect();
      }

      socket.emit("register_user", user._id);

      console.log("Socket Registered:", user._id);
    }
  }, [user]);

  return null;
};

export default AppInitializer;
