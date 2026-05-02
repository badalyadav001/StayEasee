"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const [activeImage, setActiveImage] = useState(0);

  // ✅ API BASE URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔥 Fetch room
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`${API_URL}/api/rooms/${id}`);
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRoom();
  }, [id]);

  // 🧮 Nights calc
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn + "T00:00:00");
    const end = new Date(checkOut + "T00:00:00");

    const diffTime = end.getTime() - start.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();

  const totalPrice =
    nights > 0 && room?.room_price
      ? nights * room.room_price
      : 0;

  // 💾 Booking save
  const handleBooking = async () => {
    if (!room) return alert("Room not loaded ❌");
    if (!checkIn || !checkOut) return alert("Select dates ❌");
    if (nights <= 0) return alert("Invalid dates ❌");

    setBookingLoading(true);

    const bookingData = {
      roomId: room._id,
      roomName: room.room_name,
      pricePerNight: room.room_price,
      image: room.room_images?.[0]?.url || "",
      checkIn,
      checkOut,
      totalPrice,
    };

    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }

      router.push("/bookings");
    } catch (err) {
      console.error(err);
      alert("Booking failed ❌");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading room...
      </main>
    );
  }

  if (!room) {
    return (
      <main>
        <Navbar />
        <div className="p-20 text-center text-red-500">
          Room not found
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="px-6 py-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* IMAGE */}
        <div>
          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-lg mb-4">
            {room?.room_images?.length > 0 ? (
              <Image
                src={room.room_images[activeImage]?.url}
                alt={room.room_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {room?.room_images?.map((img: any, index: number) => (
              <div
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative w-24 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  activeImage === index
                    ? "border-black"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={img.url}
                  alt="thumb"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-4xl font-bold mb-3">
            {room.room_name}
          </h1>

          <p className="text-3xl font-bold mb-8">
            ₹{room.room_price} / night
          </p>

          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <h2 className="font-semibold text-lg mb-4">
              Book this room
            </h2>

            <input
              type="date"
              className="border p-2 w-full mb-3 rounded"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            <input
              type="date"
              className="border p-2 w-full mb-3 rounded"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            {nights > 0 && (
              <p className="mb-3 font-semibold">
                Total: ₹{totalPrice}
              </p>
            )}

            <button
              onClick={handleBooking}
              disabled={nights === 0 || bookingLoading}
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              {bookingLoading ? "Booking..." : "Book Now"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}