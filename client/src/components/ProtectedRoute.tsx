import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/auth";
import type { AppDispatch } from "../store/store";
import { logout, setUser } from "../redux/slices/userSlice";

interface ProtectedRouteProps {
  allowedRoles?: string[]; // e.g., ["entrepreneur"]
  children?: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, role, hasFetched } = useSelector(
    (state: any) => state.user,
  );

  useEffect(() => {
    if (!hasFetched) {
      const fetchUser = async () => {
        try {
          const res = await getCurrentUser();
          if (res?.user) {
            dispatch(setUser(res.user));
          }
        } catch {
          dispatch(logout());
        }
      };
      fetchUser();
    }
  }, [dispatch, hasFetched]);

  // While not fetched yet, show loading
  if (!hasFetched) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-indigo-600 text-lg font-semibold">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-red-600 text-center mt-20">
          Access Denied: You do not have permission to view this page.
        </h1>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
