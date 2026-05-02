const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  roomId: String,
  roomName: String,
  pricePerNight: Number,
  checkIn: String,
  checkOut: String,
  totalPrice: Number,
  image: String,

  status: {
    type: String,
    default: "active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);