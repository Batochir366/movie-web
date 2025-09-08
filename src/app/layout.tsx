import "./globals.css";
import { Nav } from "@/components/Navigation/Nav";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
