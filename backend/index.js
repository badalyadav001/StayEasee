const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

// 🔥 MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err.message));

// 🔥 Models
const Room = require("./models/Room");
const Booking = require("./models/Booking");

// =============================
// 🧪 Test
// =============================
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// =============================
// 🏨 ROOMS
// =============================

// ✅ All Rooms
app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});

// ✅ Single Room
app.get("/api/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Invalid room ID" });
  }
});

// =============================
// 📦 BOOKINGS (DB)
// =============================

// ✅ Create Booking
app.post("/api/bookings", async (req, res) => {
  try {
    console.log("👉 Incoming Body:", req.body);

    const booking = await Booking.create(req.body);

    console.log("✅ Booking Saved:", booking);

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log("❌ Booking Error:", error);

    res.status(500).json({
      message: "Booking failed",
      error: error.message,
    });
  }
});

// ✅ Get Bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// ✅ Cancel Booking
app.put("/api/bookings/:id/cancel", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true },
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Booking cancelled ❌",
    });
  } catch (error) {
    res.status(500).json({ message: "Cancel failed" });
  }
});

// =============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
