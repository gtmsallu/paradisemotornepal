const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  carModel: {
    type: String,
    require: true,
  },
});

const bookingList = mongoose.model("BOOKINGLIST", bookingSchema);
module.exports = bookingList;
