"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function BookingSuccess() {
  return (
    <main>
      <Navbar />

      <section className="flex flex-col items-center justify-center h-[70vh] text-center">
        
        <h1 className="text-4xl font-bold mb-4">
          🎉 Booking Confirmed!
        </h1>

        <p className="text-gray-500 mb-6">
          Your room has been successfully booked.
        </p>

        <Link href="/rooms">
          <button className="bg-black text-white px-6 py-3 rounded-xl">
            Explore More Rooms
          </button>
        </Link>
      </section>
    </main>
  );
}