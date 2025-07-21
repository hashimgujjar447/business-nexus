import { useEffect } from "react";
import { useAppDispatch } from "./useTypedHooks";
import { fetchCurrentUser } from "../features/auth/authSlice";

const AppInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return null;
};

export default AppInitializer;
