const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

//we r hashing password
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//     this.cpassword = await bcrypt.hash(this.cpassword, 12);
//   }
//   next();
// });

//we r generating token

// stored the message
// userSchema.methods.addMessage = async function (name, email, phone, message) {
//   try {
//     this.messages = this.messages.concat({ name, email, phone, message });
//     await this.save();
//     return this.messages;
//   } catch (error) {
//     console.log(error);
//   }
// };

const User = mongoose.model("USER", userSchema);

module.exports = User;
