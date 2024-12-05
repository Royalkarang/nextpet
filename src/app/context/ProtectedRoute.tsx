"use client";
import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Optionally, display a loader while redirecting

  return <>{children}</>;
};

export default ProtectedRoute;
