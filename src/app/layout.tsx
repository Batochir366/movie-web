"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Navigation/Nav";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [color, setColor] = useState(true);
  const Handle = () => {
    setColor(!color);
  };
  return (
    <html lang="en">
      <body className={`${color ? "bg-white" : "bg-black"} `}>
        <Nav HandleOnClick={Handle} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
