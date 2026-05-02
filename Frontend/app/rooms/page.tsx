"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import RoomCard from "@/components/RoomCard";
import SkeletonCard from "@/components/SkeletonCard";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`);
        const data = await res.json();

        setRooms(data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <main>
      <Navbar />

      <section className="px-6 py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Explore Rooms</h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No rooms found 😕
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
  <RoomCard
    key={room._id}
    room={{
      id: String(room._id), // 🔥 FIX
      name: room.room_name,
      price: room.room_price,
      image: room.room_images?.[0]?.url || "",
    }}
  />
))}
          </div>
        )}
      </section>
    </main>
  );
}
