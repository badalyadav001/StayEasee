"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function BookingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchBookings();
    }
  }, [user]);

  // ✅ FIXED API
  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`
      );
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED CANCEL API
  const handleCancel = async (id: string) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}/cancel`,
        {
          method: "PUT",
        }
      );

      fetchBookings();
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">📊 My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No bookings yet 😕</p>

            <Link
              href="/rooms"
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Book Now
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative w-full h-52">
                  {booking.image ? (
                    <Image
                      src={booking.image}
                      alt={booking.roomName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-1">
                    {booking.roomName}
                  </h2>

                  <p
                    className={`text-sm font-medium mb-2 ${
                      booking.status === "cancelled"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {booking.status === "cancelled"
                      ? "Cancelled ❌"
                      : "Confirmed ✅"}
                  </p>

                  <p className="text-gray-500 mb-2">
                    ₹{booking.pricePerNight} / night
                  </p>

                  <div className="text-sm text-gray-600 mb-3">
                    <p>Check-in: {booking.checkIn}</p>
                    <p>Check-out: {booking.checkOut}</p>
                  </div>

                  <p className="font-bold text-lg mb-4">
                    Total: ₹{booking.totalPrice}
                  </p>

                  <div className="flex gap-3">
                    <Link
                      href={`/rooms/${booking.roomId}`}
                      className="flex-1 text-center bg-black text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Link>

                    <button
                      disabled={booking.status === "cancelled"}
                      onClick={() => handleCancel(booking._id)}
                      className={`flex-1 px-4 py-2 rounded-lg transition ${
                        booking.status === "cancelled"
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}