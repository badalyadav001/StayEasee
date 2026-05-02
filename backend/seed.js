// require("dotenv").config();
// const mongoose = require("mongoose");

// const Room = require("./models/Room");

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB Connected ✅"))
//   .catch((err) => console.log(err));

// const seedRooms = async () => {
//   try {
//     await Room.deleteMany();

//     // 🔥 NEW DATA INSERT
//     await Room.insertMany([
//       {
//         room_name: "Luxury Suite",
//         room_price: 5000,
//         room_type: "suite",
//         room_capacity: 2,
//         room_images: [
//           {
//             url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
//           },
//         ],
//       },
//       {
//         room_name: "Deluxe Room",
//         room_price: 3000,
//         room_type: "deluxe",
//         room_capacity: 3,
//         room_images: [
//           {
//             url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
//           },
//         ],
//       },
//       {
//         room_name: "Standard Room",
//         room_price: 2000,
//         room_type: "standard",
//         room_capacity: 2,
//         room_images: [
//           {
//             url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
//           },
//         ],
//       },
//       {
//         room_name: "Family Suite",
//         room_price: 6000,
//         room_type: "suite",
//         room_capacity: 4,
//         room_images: [
//           {
//             url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
//           },
//         ],
//       },
//     ]);

//     console.log("🔥 Rooms Seeded Successfully!");
//     process.exit();
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// seedRooms();

require("dotenv").config();
const mongoose = require("mongoose");

const Room = require("./models/Room");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const seedRooms = async () => {
  try {
    await Room.deleteMany();

    await Room.insertMany([
      {
        room_name: "Luxury Ocean Suite",
        room_price: 8000,
        room_type: "suite",
        room_capacity: 2,
        room_images: [
          { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" },
          {
            url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
          },
          {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
          },
        ],
      },
      {
        room_name: "Deluxe City View",
        room_price: 4500,
        room_type: "deluxe",
        room_capacity: 3,
        room_images: [
          {
            url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
          },
          {
            url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
          },
          {
            url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
          },
        ],
      },
      {
        room_name: "Standard Comfort Room",
        room_price: 2500,
        room_type: "standard",
        room_capacity: 2,
        room_images: [
          {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
          },
          { url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4" },
          {
            url: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
          },
        ],
      },
      {
        room_name: "Family Royal Suite",
        room_price: 9000,
        room_type: "suite",
        room_capacity: 5,
        room_images: [
          {
            url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
          },
          {
            url: "https://images.unsplash.com/photo-1590490359683-658d3d23f972",
          },
          {
            url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
          },
        ],
      },
      {
        room_name: "Business Executive Room",
        room_price: 5500,
        room_type: "deluxe",
        room_capacity: 2,
        room_images: [
          { url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa" },
          { url: "https://images.unsplash.com/photo-1551776235-dde6d4829808" },
          {
            url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
          },
        ],
      },
      {
        room_name: "Budget Cozy Room",
        room_price: 1800,
        room_type: "standard",
        room_capacity: 2,
        room_images: [
          {
            url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
          },
          {
            url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
          },
          {
            url: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
          },
        ],
      },
      {
        room_name: "Penthouse Suite",
        room_price: 12000,
        room_type: "suite",
        room_capacity: 4,
        room_images: [
          {
            url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
          },
          {
            url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
          },
          { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" },
        ],
      },
      {
        room_name: "Garden View Deluxe",
        room_price: 4000,
        room_type: "deluxe",
        room_capacity: 3,
        room_images: [
          { url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4" },
          { url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa" },
          { url: "https://images.unsplash.com/photo-1551776235-dde6d4829808" },
        ],
      },
      {
        room_name: "Minimalist Studio Room",
        room_price: 2200,
        room_type: "standard",
        room_capacity: 2,
        room_images: [
          {
            url: "https://images.unsplash.com/photo-1590490359683-658d3d23f972",
          },
          {
            url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
          },
          {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
          },
        ],
      },
      {
        room_name: "Luxury Presidential Suite",
        room_price: 15000,
        room_type: "suite",
        room_capacity: 6,
        room_images: [
          {
            url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
          },
          {
            url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
          },
          {
            url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
          },
        ],
      },
    ]);

    console.log("🔥 10 Premium Rooms Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedRooms();
