const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
require("../db/conn");
const User = require("../model/userSchema");
const adminList = require("../model/adminSchema");
const bookingList = require("../model/bookingSchema");
const store = require("../middleware/multer");
const Teams = require("../model/teamSchema");
const Works = require("../model/worksSchema");
const reviewList = require("../model/reviewSchema");
const authenticate = require("../middleware/authenticate");
router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/contact", async (req, res) => {
  try {
    const { name, phone, email, address, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.status(401).json({ error: "plss fileed the contact form" });
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

router.post("/", controller.bookingRoute);

router.post("/mail", controller.subscribeMailRoute);

router.post("/login", controller.loginRoute);

router.post("/logout", controller.logoutRoute);

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
router.post("/admin/add-team", store.single("image"), controller.addTeamRoute);
//getting teams list
router.get("/getTeams", authenticate, async (req, res) => {
  try {
    const team = await Teams.find({});

    res.send(team);
  } catch (error) {
    console.log(error);
  }
});

//deleting subscriber
router.delete("/deleteSubscriber/:id", authenticate, async (req, res) => {
  try {
    console.log(req.params.id);
    const deleteMail = await subscriberMail.deleteOne({ _id: req.params.id });
    if (deleteMail) {
      res.status(200).json("deleted");
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
});

// deleting teams
router.delete("/dltTeam/:id", authenticate, async (req, res) => {
  try {
    console.log(req.params.id);
    const deleteTeam = await Teams.deleteOne({ _id: req.params.id });
    if (deleteTeam) {
      res.status(200).json("Team is deleted");
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
});

//to add review
router.post("/admin/add-review", authenticate, async (req, res) => {
  try {
    const { clientImage, carImage, customerName, customerReview } = req.body;
    if (!clientImage || !carImage || !customerName || !customerReview) {
      return res.status(401).json("please fill the credentials");
    }
    const review = await new reviewList({
      clientImage,
      carImage,
      customerName,
      customerReview,
    });
    await review.save();
    return res.status(200).json(" review successfull added!!");
  } catch (error) {
    console.log("error");
  }
});

//to view review
router.get("/getReview", authenticate, async (req, res) => {
  try {
    const reviewlist = await reviewList.find({});

    res.json(reviewlist);
  } catch (error) {
    console.log(error);
  }
});

//delete review
router.delete("/dltReview/:id", authenticate, async (req, res) => {
  try {
    const reviewlist = await reviewList.deleteOne({ _id: req.params.id });
    if (reviewList) {
      res.status(200).json("review deleted");
    } else {
      res.status(401).json("not deleted");
    }
  } catch (error) {
    console.log(error);
  }
});

//add works
router.post("/admin/add-work", controller.addWorkRoute);

//to view work
router.get("/getWork", authenticate, async (req, res) => {
  try {
    const works = await Works.find({});

    res.json(works);
  } catch (error) {
    console.log(error);
  }
});

//delete work
router.delete("/dltWorks/:id", authenticate, async (req, res) => {
  try {
    const works = await Works.deleteOne({ _id: req.params.id });
    if (works) {
      res.status(200).json("review deleted");
    } else {
      res.status(401).json("not deleted");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
