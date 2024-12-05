"use client"

import { AuthProvider } from "./context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../../public/css/bootstrap.min.css";
import "../../public/fonts/stylesheet.css";
import "../../public/css/animation.css";
import "../../public/css/custom.css";
import "../../public/css/userStyle.css";
import "../../public/css/style.css";
import "../../public/css/slider.css";
import "../../public/css/responsive.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SessionProvider>
            <Header />
            {children}
            <Footer />
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
