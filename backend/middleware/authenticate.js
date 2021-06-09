const jwt = require("jsonwebtoken");
const adminList = require("../model/adminSchema");

const authenticate = async (req, res, next) => {
  try {
    // const token = req.headers.cookie.split("=")[1];
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootAdmin = await adminList.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootAdmin) {
      throw new Error("usernot found");
    }
    req.token = token;
    req.rootAdmin = rootAdmin;
    req.userID = rootAdmin._id;
    next();
  } catch (error) {
    res.status(401).send("Unauthorised: No token provide");
  }
};
module.exports = authenticate;
