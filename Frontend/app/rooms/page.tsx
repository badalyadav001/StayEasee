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
// "use client";

// import { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import RoomCard from "@/components/RoomCard";
// import SkeletonCard from "@/components/SkeletonCard";

// const roomsData = [
//   {
//     id: "1",
//     name: "Luxury Suite",
//     price: 5000,
//     type: "suite",
//     capacity: 2,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
//   },
//   {
//     id: "2",
//     name: "Deluxe Room",
//     price: 3000,
//     type: "deluxe",
//     capacity: 3,
//     image:
//       "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
//   },
//   {
//     id: "3",
//     name: "Standard Room",
//     price: 2000,
//     type: "standard",
//     capacity: 2,
//     image:
//       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
//   },
//   {
//     id: "4",
//     name: "Family Suite",
//     price: 6000,
//     type: "suite",
//     capacity: 4,
//     image:
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
//   },
// ];

// export default function RoomsPage() {
//   const [search, setSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [type, setType] = useState("all");
//   const [maxPrice, setMaxPrice] = useState(6000);
//   const [capacity, setCapacity] = useState("all");

//   const [sort, setSort] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1200);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 400);
//     return () => clearTimeout(timer);
//   }, [search]);

//   const filteredRooms = roomsData.filter((room) => {
//     const matchesType = type === "all" || room.type === type;
//     const matchesSearch = room.name
//       .toLowerCase()
//       .includes(debouncedSearch.toLowerCase());
//     const matchesPrice = room.price <= maxPrice;
//     const matchesCapacity =
//       capacity === "all" || room.capacity >= Number(capacity);

//     return (
//       matchesType &&
//       matchesSearch &&
//       matchesPrice &&
//       matchesCapacity
//     );
//   });

//   let finalRooms = [...filteredRooms];

//   if (sort === "low") finalRooms.sort((a, b) => a.price - b.price);
//   if (sort === "high") finalRooms.sort((a, b) => b.price - a.price);

//   return (
//     <main>
//       <Navbar />

//       <section className="px-6 py-12 max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold mb-8">Explore Rooms</h1>

//         {/* SEARCH */}
//         <input
//           type="text"
//           placeholder="Search rooms..."
//           className="border px-4 py-3 rounded-xl w-full md:w-1/3 mb-6 focus:ring-2 focus:ring-black"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {/* SORT */}
//         <select
//           onChange={(e) => setSort(e.target.value)}
//           className="border px-4 py-2 rounded-xl mb-6"
//         >
//           <option value="">Sort</option>
//           <option value="low">Price Low → High</option>
//           <option value="high">Price High → Low</option>
//         </select>

//         {/* PRICE */}
//         <div className="mb-6">
//           <label className="block mb-2 font-medium">
//             Max Price: ₹{maxPrice}
//           </label>
//           <input
//             type="range"
//             min="1000"
//             max="6000"
//             step="500"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(Number(e.target.value))}
//             className="w-full"
//           />
//         </div>

//         {/* TYPE */}
//         <div className="flex gap-3 mb-4 flex-wrap">
//           {["all", "suite", "deluxe", "standard"].map((item) => (
//             <button
//               key={item}
//               onClick={() => setType(item)}
//               className={`px-4 py-2 rounded-xl border ${
//                 type === item
//                   ? "bg-black text-white"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         {/* CAPACITY */}
//         <div className="flex gap-3 mb-10 flex-wrap">
//           {["all", "2", "3", "4"].map((item) => (
//             <button
//               key={item}
//               onClick={() => setCapacity(item)}
//               className={`px-4 py-2 rounded-xl border ${
//                 capacity === item
//                   ? "bg-black text-white"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               {item === "all"
//                 ? "All Guests"
//                 : `${item}+ Guests`}
//             </button>
//           ))}
//         </div>

//         {/* ERROR */}
//         {error && (
//           <div className="text-center py-20 text-red-500">
//             Something went wrong ⚠️
//           </div>
//         )}

//         {/* GRID */}
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[...Array(6)].map((_, i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         ) : finalRooms.length === 0 ? (
//           <div className="text-center py-20 text-gray-500">
//             No rooms found 😕
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {finalRooms.map((room) => (
//               <RoomCard key={room.id} room={room} />
//             ))}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }

