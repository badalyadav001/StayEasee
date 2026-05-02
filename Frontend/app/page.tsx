"use client";

import { useEffect, useState } from "react";
import Testimonials from "@/components/Testimonials";
import Navbar from "../src/components/Navbar";
import RoomCard from "@/components/RoomCard";

export default function Home() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch rooms from backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rooms");
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

  // 🔄 Transform backend data → frontend format
  const mappedRooms = rooms.map((room: any) => ({
    id: room._id,
    name: room.room_name,
    price: room.room_price,
    image: room.room_images?.[0]?.url,
  }));

  return (
    <main className="bg-gray-50">
      <Navbar />

      {/* 🔥 HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 px-6 max-w-3xl">
          <p className="uppercase tracking-widest text-sm text-gray-300 mb-4">
            Luxury • Comfort • Experience
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Find Your <span className="text-blue-500">Perfect Stay</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Discover handpicked luxury rooms, curated for comfort and unforgettable experiences.
          </p>

          <a
            href="/rooms"
            className="inline-block bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 hover:bg-gray-200 transition duration-300 shadow-lg"
          >
            Explore Rooms →
          </a>

          {/* STATS */}
          <div className="flex justify-center gap-10 mt-12 text-white">
            <div>
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-sm text-gray-300">Rooms</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">10k+</h3>
              <p className="text-sm text-gray-300">Happy Guests</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">4.8★</h3>
              <p className="text-sm text-gray-300">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 💎 WHY CHOOSE US */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Premium Rooms", icon: "🏨" },
            { title: "Best Prices", icon: "💰" },
            { title: "Instant Booking", icon: "⚡" },
            { title: "24/7 Support", icon: "📞" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border hover:shadow-lg transition"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 🏨 FEATURED ROOMS */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured Rooms
          </h2>

          <a
            href="/rooms"
            className="text-blue-600 font-medium hover:underline"
          >
            View All →
          </a>
        </div>

        {/* 🔥 LOADING */}
        {loading ? (
          <p className="text-center text-gray-500">Loading rooms...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mappedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>

      {/* 🌊 LUXURY SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501117716987-c8e1ecb210f0"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-2xl px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Experience Luxury Like Never Before
          </h2>
          <p className="text-gray-200 mb-6">
            From ocean views to private villas, enjoy unmatched comfort and elegance.
          </p>
          <a
            href="/rooms"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Discover Now
          </a>
        </div>
      </section>

      {/* ⭐ TESTIMONIALS */}
      <Testimonials />

      {/* 🚀 CTA */}
      <section className="py-20 text-center bg-black text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Book Your Dream Stay?
        </h2>

        <p className="text-gray-300 mb-6">
          Browse our premium rooms and reserve instantly.
        </p>

        <a
          href="/rooms"
          className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Explore Rooms
        </a>
      </section>

      {/* 📌 FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center">
        <p>Mr. Badal Yadav © 2026 StayEase. All rights reserved.</p>
      </footer>
    </main>
  );
}