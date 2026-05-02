"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Room = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function RoomCard({ room }: { room: Room }) {
  const [liked, setLiked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]");

    // 🔥 IMPORTANT: ensure string compare
    setLiked(saved.includes(String(room.id)));
  }, [room.id]);

  const toggleLike = (e: any) => {
    e.preventDefault();

    let saved: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (saved.includes(String(room.id))) {
      saved = saved.filter((id) => id !== String(room.id));
      setLiked(false);
    } else {
      saved.push(String(room.id));
      setLiked(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(saved));
  };

  return (
    <Link href={`/rooms/${room.id}`}>
      <div className="rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 cursor-pointer group relative bg-white hover:scale-[1.03]">
        
        {/* ❤️ Wishlist */}
        <button
          onClick={toggleLike}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow z-10 hover:scale-110 transition"
        >
          {liked ? "❤️" : "🤍"}
        </button>

        {/* ⭐ Rating */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-lg text-xs font-semibold shadow z-10">
          ⭐ 4.8
        </div>

        {/* IMAGE */}
        <div className="relative w-full h-56 overflow-hidden">
          {!loaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse" />
          )}

          <Image
            src={room.image || "https://via.placeholder.com/400"}
            alt={room.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setLoaded(true)}
            className={`object-cover transition duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-110`}
          />
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h2 className="text-xl font-semibold mb-1 group-hover:text-blue-600 transition">
            {room.name}
          </h2>

          <p className="text-gray-500 text-sm mb-4">
            Premium stay experience
          </p>

          <div className="flex items-center justify-between">
            <p className="font-bold text-lg">
              ₹{room.price}
              <span className="text-sm text-gray-500">
                {" "} / night
              </span>
            </p>

            <span className="text-sm bg-black text-white px-4 py-1.5 rounded-lg">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// type Room = {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
// };

// export default function RoomCard({ room }: { room: Room }) {
//   const [liked, setLiked] = useState(false);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
//     setLiked(saved.includes(room.id));
//   }, [room.id]);

//   const toggleLike = (e: any) => {
//     e.preventDefault();

//     const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");

//     let updated;
//     if (saved.includes(room.id)) {
//       updated = saved.filter((id: string) => id !== room.id);
//       setLiked(false);
//     } else {
//       updated = [...saved, room.id];
//       setLiked(true);
//     }

//     localStorage.setItem("wishlist", JSON.stringify(updated));
//   };

//   return (
//       <Link href={`/rooms/${room.id}`}>
//       <div className="rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 cursor-pointer group relative bg-white hover:scale-[1.03]">
        
//         {/* ❤️ Wishlist */}
//         <button
//           onClick={toggleLike}
//           className="absolute top-4 right-4 bg-white p-2 rounded-full shadow z-10 hover:scale-110 transition"
//         >
//           {liked ? "❤️" : "🤍"}
//         </button>

//         {/* ⭐ Rating */}
//         <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-lg text-xs font-semibold shadow z-10">
//           ⭐ 4.8
//         </div>

//         {/* IMAGE */}
//         <div className="relative w-full h-56 overflow-hidden">
//           {!loaded && (
//             <div className="absolute inset-0 bg-gray-300 animate-pulse" />
//           )}

//           <Image
//   src={room.image || "https://via.placeholder.com/400"}
//   alt={room.name}
//   fill
//   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//   onLoad={() => setLoaded(true)}
//   className={`object-cover transition duration-700 ${
//     loaded ? "opacity-100" : "opacity-0"
//   } group-hover:scale-110`}
// />

//           {/* Gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
//         </div>

//         {/* CONTENT */}
//         <div className="p-5">
//           <h2 className="text-xl font-semibold mb-1 group-hover:text-blue-600 transition">
//             {room.name}
//           </h2>

//           <p className="text-gray-500 text-sm mb-4">
//             Premium stay experience
//           </p>

//           <div className="flex items-center justify-between">
//             <p className="font-bold text-lg">
//               ₹{room.price}
//               <span className="text-sm text-gray-500">
//                 {" "} / night
//               </span>
//             </p>

//             <span className="text-sm bg-black text-white px-4 py-1.5 rounded-lg group-hover:bg-gray-800 transition">
//               View →
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// "use client";

// import Image from "next/image";
// import Link from "next/link";

// export default function RoomCard({ room }: any) {
//   return (
//     <Link href={`/rooms/${room._id}`}>
//       <div className="rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer bg-white">

//         <div className="relative w-full h-56">
//           <Image
//             src={room.room_images?.[0]?.url || "/fallback.jpg"}
//             alt={room.room_name}
//             fill
//             sizes="100vw"
//             className="object-cover"
//           />
//         </div>

//         <div className="p-5">
//           <h2 className="text-xl font-semibold mb-2">
//             {room.room_name}
//           </h2>

//           <p className="text-gray-500 text-sm mb-2">
//             {room.room_type}
//           </p>

//           <p className="font-bold text-lg">
//             ₹{room.room_price} / night
//           </p>
//         </div>
//       </div>
//     </Link>
//   );
// }