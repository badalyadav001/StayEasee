"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-6 py-4 fixed w-full top-0 z-50 bg-white/70 backdrop-blur-lg border-b shadow-sm">
      
      {/* LOGO */}
      <h1
        onClick={() => router.push("/")}
        className="text-2xl font-bold tracking-wide cursor-pointer"
      >
        Stay<span className="text-blue-600">Ease</span>
      </h1>

      {/* LINKS */}
      <div className="hidden md:flex gap-8 text-gray-700 font-medium items-center">
        <Link href="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <Link href="/rooms" className="hover:text-blue-600 transition">
          Rooms
        </Link>

        {/* 🔐 Protected links */}
        {user && (
          <>
            <Link href="/wishlist" className="hover:text-blue-600">
              Wishlist
            </Link>
            <Link href="/bookings" className="hover:text-blue-600">
              Bookings
            </Link>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {!user ? (
          <button
            onClick={() => router.push("/login")}
            className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition active:scale-95 shadow"
          >
            Login
          </button>
        ) : (
          <>
            {/* 👤 User name */}
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              Hi, {user.name}
            </span>

            {/* 🚪 Logout */}
            <button
              onClick={logout}
              className="border px-4 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}