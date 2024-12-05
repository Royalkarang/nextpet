"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  console.log(session, status)
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>; // Optional: You can display a loading spinner
  }

  if (!session) {
    // Redirect to the sign-in page if not logged in
    router.push("/user/sign-in");
    return null;
  }

  return (
    <div>
      <h2>Protected Page</h2>
      <p>Welcome, {session.user.name}! ddsds</p>
    </div>
  );
}
