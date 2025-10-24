const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const Email = require("../utilsServer/email");
const crypto = require("crypto");
const isEmail = require("validator/lib/isEmail");

// REQUEST PASSWORD RESET
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!isEmail(email)) {
      return res.status(401).send("Invalid Email");
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).send("No user found with this email");
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    // Set token and expiration (10 minutes from now)
    user.resetToken = hashedToken;
    user.expireToken = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    // Send email
    try {
      await new Email(user).sendPasswordReset(resetUrl);
      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      user.resetToken = undefined;
      user.expireToken = undefined;
      await user.save();
      
      return res.status(500).send("Error sending email");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

// VALIDATE RESET TOKEN
router.post("/validate-token", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).send("Token is required");
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await UserModel.findOne({
      resetToken: hashedToken,
      expireToken: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send("Invalid or expired token");
    }

    res.status(200).json({ valid: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

// RESET PASSWORD
router.post("/reset", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).send("Token and new password are required");
    }

    if (newPassword.length < 6) {
      return res.status(401).send("Password must be at least 6 characters");
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await UserModel.findOne({
      resetToken: hashedToken,
      expireToken: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send("Invalid or expired token");
    }

    // Hash new password
    const bcrypt = require("bcryptjs");
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.expireToken = undefined;
    
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
