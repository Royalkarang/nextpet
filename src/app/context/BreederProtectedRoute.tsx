"use client";
import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BreederProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isBreederAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isBreederAuthenticated) {
        router.push("/breeder/sign-in"); // Redirect to login if not authenticated
        toast.error('Please Login First...')
    }
  }, [isBreederAuthenticated, router]);

  if (!isBreederAuthenticated) return null; // Optionally, display a loader while redirecting

  return <>{children}</>;
};

export default BreederProtectedRoute;
