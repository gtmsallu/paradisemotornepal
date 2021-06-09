const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  clientImage: { type: String, require: true },
  carImage: { type: String, require: true },
  customerName: { type: String, require: true },
  customerReview: { type: String, require: true },
});

const reviewList = mongoose.model("REVIEWLIST", reviewSchema);
module.exports = reviewList;
