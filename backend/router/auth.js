const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("../db/conn");
const User = require("../model/userSchema");
const bookingList = require("../model/bookingSchema");
const subscriberMail = require("../model/subscribeSchema");
const adminList = require("../model/adminSchema");
const authenticate = require("../middleware/authenticate");
router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/contact", async (req, res) => {
  try {
    const { name, phone, email, address, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "plss fileed the contact form" });
    }
    // const userContact = User.findOne({ email: email });
    // if (userContact) {
    //   const userMessage = await userContact.addMessage(
    //     name,
    //     phone,
    //     email,
    //     address,
    //     message
    //   );
    //   await userContact.save();
    //   res.status(201).json({ message: "message send succesfully" });
    // }
    else {
      const user = new User({ name, phone, email, address, message });
      user.save();
      res.status(201).json({ message: "message send succesfully" });
    }
  } catch (error) {}
});

router.post("/", async (req, res) => {
  try {
    const { name, phone, carModel } = req.body;
    if (!name || !phone || !carModel) {
      console.log("error in book list");
      return res.status(422).json({ error: "plss fileed the Booking Form" });
    } else {
      const booking = new bookingList({ name, phone, carModel });
      booking.save();
      res
        .status(201)
        .json({ message: "booking request send successfully, thank you" });
    }
  } catch (err) {
    console.log("Booking problem");
  }
});

router.post("/mail", async (req, res) => {
  try {
    const { subscribeMail } = req.body;

    if (!subscribeMail) {
      console.log("fill it");
      return res.status(422).json({ error: "plss fileed the email Form" });
    }

    const isMatch = await subscriberMail.findOne({
      subscribeMail: subscribeMail,
    });
    if (isMatch) {
      res
        .status(422)
        .json({ message: "your mail was already registered try new one" });
    } else {
      console.log(subscribeMail);
      const subscriber = new subscriberMail({ subscribeMail });
      subscriber.save();
      res
        .status(201)
        .json({ message: "you hanve been subscribed successfully, thank you" });
    }
  } catch (err) {
    console.log("Subscribe problem");
  }
});

router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json("please fill the credentials");
    }
    const isMatch = await adminList.findOne({
      email: email,
      password: password,
    });
    if (isMatch) {
      token = await isMatch.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 155520000),
        httpOnly: true,
      });

      return res.json("Admin login successfull");
    } else {
      return res.status(400).json("credential doesnot match");
    }
  } catch (error) {
    console.log("error");
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).json("Admin logged out");
});

router.get("/admin", authenticate, async (req, res) => {
  res.send(req.rootAdmin);
});

//getting data for admin profile
router.get("/getadmindata", authenticate, async (req, res) => {
  res.send(req.rootAdmin);
});
//get booking list
router.get("/getBookingList", authenticate, async (req, res) => {
  try {
    const bookinglist = await bookingList.find({});

    res.send(bookinglist);
  } catch (error) {
    console.log(error);
  }
});

//getting message list
router.get("/getMessages", authenticate, async (req, res) => {
  try {
    const messagelist = await User.find({});

    res.send(messagelist);
  } catch (error) {
    console.log(error);
  }
});

//to get subscriber
router.get("/getSubscriber", authenticate, async (req, res) => {
  try {
    const subscriberlist = await subscriberMail.find({});
    res.send(subscriberlist);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
