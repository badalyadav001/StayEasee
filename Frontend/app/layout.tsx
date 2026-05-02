import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "StayEase",
  description: "Premium Hotel Booking Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        
        {/* 🔐 GLOBAL AUTH WRAP */}
        <AuthProvider>
          {children}
        </AuthProvider>

      </body>
    </html>
  );
}