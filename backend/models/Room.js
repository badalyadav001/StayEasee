const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room_name: String,
  room_price: Number,
  room_type: String,
  room_capacity: Number,
  room_images: [
    {
      url: String,
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
