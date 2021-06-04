const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("../db/conn");
const User = require("../model/userSchema");
const bookingList = require("../model/bookingSchema");
const subscriberMail = require("../model/subscribeSchema");
const adminList = require("../model/adminSchema");
const Teams = require("../model/teamSchema");
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

//changing mail for admin
router.put("/changeMail", authenticate, async (req, res) => {
  try {
    const { oldEmail, newEmail, reEmail } = req.body;
    if (!newEmail || !reEmail) {
      return res.status(400).json("Please fill the credentials");
    }
    if (newEmail === reEmail) {
      const isMatch = await adminList.findByIdAndUpdate(
        (_id = req.rootAdmin._id),
        { email: newEmail }
      );
      // if (isMatch) {
      //   const adminMail = new adminList({ email: newEmail });
      //   adminMail.save();
      //   console.log(ismatch.email);
      //   res.json("email has been changed");
      // }
      res.status(200).json("email has been changed");
    } else {
      return res.status(401).json("credential mismatch...");
    }
  } catch (error) {
    console.log(error);
  }
});

//changing password for admin
router.put("/changePassword", authenticate, async (req, res) => {
  try {
    const { oldPassword, newPassword, cPassword } = req.body;
    if (!newPassword || !cPassword) {
      return res.status(400).json("Please fill the credentials");
    }
    if (newPassword === cPassword) {
      const isMatch = await adminList.findByIdAndUpdate(
        (_id = req.rootAdmin._id),
        { password: newPassword, cpassword: cPassword }
      );
      // if (isMatch) {
      //   const adminMail = new adminList({ email: newPassword });
      //   adminMail.save();
      //   console.log(ismatch.email);
      //   res.send("email has been changed");
      // }
      res.status(200).json("password has been changed");
    } else {
      return res.status(401).json("credential mismatch...");
    }
  } catch (error) {
    console.log(error);
  }
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

//to add teams
router.post("/admin/add-team", async (req, res) => {
  try {
    const { image, name, description } = req.body;
    if (!name || !description || !image) {
      return res.status(401).json("please fill the credentials");
    }
    const team = await new Teams({
      image: image,
      name: name,
      description: description,
    });
    await team.save();
    return res.status(200).json(" Team successfull added!!");
  } catch (error) {
    console.log("error");
  }
});

//getting teams list
router.get("/getTeams", authenticate, async (req, res) => {
  try {
    const team = await Teams.find({});

    res.send(team);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
