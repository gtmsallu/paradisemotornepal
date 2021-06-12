const mongoose = require("mongoose");
const worksSchema = new mongoose.Schema({
  carName: {
    type: String,
    require: true,
  },
  carimage: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Works = mongoose.model("WORK", worksSchema);
module.exports = Works;
