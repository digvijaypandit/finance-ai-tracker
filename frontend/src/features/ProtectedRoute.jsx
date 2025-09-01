import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchProfile } from "../store/authSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(fetchProfile()).unwrap().catch(() => {});
      setCheckingAuth(false);
    };
    checkAuth();
  }, [dispatch]);

  if (loading || checkingAuth) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
