const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust path if needed

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for token in Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Use your JWT secret
    req.user = await User.findById(decoded.id).select("-password"); // Add user info to request
    if (!req.user) return res.status(401).json({ msg: "User not found" });
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = authenticate;
