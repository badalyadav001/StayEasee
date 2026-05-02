"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function WishlistPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      const saved: string[] = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      setWishlist(saved);
      fetchRooms(saved);
    }
  }, [user]);

  const fetchRooms = async (wishlistIds: string[]) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`);
      const data = await res.json();

      const filtered = data.filter((room: any) =>
        wishlistIds.includes(String(room._id)) // 🔥 FIX
      );

      setRooms(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter((item) => item !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    setRooms((prev) => prev.filter((room) => room._id !== id));
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
        <h1 className="text-3xl font-bold mb-8">
          ❤️ Your Wishlist
        </h1>

        {rooms.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">
              Wishlist empty 😕
            </p>

            <Link
              href="/rooms"
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Explore Rooms
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition relative"
              >
                <button
                  onClick={() => removeFromWishlist(String(room._id))}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  ❌
                </button>

                <div className="relative w-full h-52">
                  <Image
                    src={room.room_images?.[0]?.url || "https://via.placeholder.com/400"}
                    alt={room.room_name}
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                </div>

                <div className="p-4">
                  <h2 className="font-semibold text-lg">
                    {room.room_name}
                  </h2>

                  <p className="text-gray-500 mb-3">
                    ₹{room.room_price} / night
                  </p>

                  <Link
                    href={`/rooms/${room._id}`}
                    className="inline-block bg-black text-white px-4 py-2 rounded-lg"
                  >
                    View Room
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}