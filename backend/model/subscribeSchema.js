const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema({
  subscribeMail: {
    type: String,
    require: true,
  },
});

const subscriberMail = mongoose.model("SUBSCRIBELIST", subscribeSchema);
module.exports = subscriberMail;
