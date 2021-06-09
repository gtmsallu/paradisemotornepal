const bookingList = require("../model/bookingSchema");
const subscriberMail = require("../model/subscribeSchema");
const adminList = require("../model/adminSchema");
const Teams = require("../model/teamSchema");
const Works = require("../model/worksSchema");
const reviewList = require("../model/reviewSchema");

exports.bookingRoute = async (req, res) => {
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
};

exports.subscribeMailRoute = async (req, res) => {
  try {
    const { subscribeMail } = req.body;

    if (!subscribeMail) {
      console.log("fill it");
      return res.status(402).json({ error: "plss fileed the email Form" });
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
};

exports.loginRoute = async (req, res) => {
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
};

exports.logoutRoute = async (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).json("Admin logged out");
};

exports.addWorkRoute = async (req, res) => {
  try {
    const { image, carName, description } = req.body;
    if (!image || !carName || !description) {
      return res.status(401).json("please fill the credentials");
    }
    const work = await new Works({
      carName,
      description,
      image,
    });
    await work.save();
    return res.status(200).json(" work successfull added!!");
  } catch (error) {
    console.log("error");
  }
};

exports.addTeamRoute = async (req, res) => {
  try {
    const { name, description } = req.body;
    const files = req.files.filename;
    console.log(files);
    if (!name || !description || !files) {
      return res.status(401).json("please fill the credentials");
    }
    const team = await new Teams({
      image: files,
      name: name,
      description: description,
    });
    await team.save();
    return res.status(200).json(" Team successfull added!!");
  } catch (error) {
    console.log("error");
  }
};

exports.addReviewRoute = async (req, res) => {
  try {
    const { customerName, customerReview } = req.body;
    console.log(req.files);
    const carimgfile = req.files.carImage;
    const clientimgfile = req.files.clientImage;
    if (!clientimgfile || !carimgfile || !customerName || !customerReview) {
      return res.status(401).json("please fill the credentials");
    }
    const review = await new reviewList({
      clientImage: clientimgfile,
      carImage: carimgfile,
      customerName: customerName,
      customerReview: customerReview,
    });
    await review.save();
    return res.status(200).json(" review successfull added!!");
  } catch (error) {
    console.log("error");
  }
};

exports.getSubscribeRoute = async (req, res) => {
  try {
    const subscriberlist = await subscriberMail.find({});
    res.json(subscriberlist);
  } catch (error) {
    console.log(error);
  }
};
