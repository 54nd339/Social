const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const router = express.Router();

//BLOCK USER
router.post("/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentUserId } = req;

    if (userId === currentUserId) {
      return res.status(400).send("Cannot block yourself");
    }

    const currentUser = await UserModel.findById(currentUserId);
    const userToBlock = await UserModel.findById(userId);

    if (!userToBlock) {
      return res.status(404).send("User not found");
    }

    // Check if already blocked
    const isAlreadyBlocked = currentUser.blockedUsers.some(
      blocked => blocked.user.toString() === userId
    );

    if (isAlreadyBlocked) {
      return res.status(400).send("User already blocked");
    }

    // Add to blocked users
    currentUser.blockedUsers.unshift({ user: userId });
    await currentUser.save();

    // Add to blocked by
    userToBlock.blockedBy.unshift({ user: currentUserId });
    await userToBlock.save();

    return res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//UNBLOCK USER
router.delete("/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentUserId } = req;

    const currentUser = await UserModel.findById(currentUserId);
    const userToUnblock = await UserModel.findById(userId);

    if (!userToUnblock) {
      return res.status(404).send("User not found");
    }

    // Remove from blocked users
    currentUser.blockedUsers = currentUser.blockedUsers.filter(
      blocked => blocked.user.toString() !== userId
    );
    await currentUser.save();

    // Remove from blocked by
    userToUnblock.blockedBy = userToUnblock.blockedBy.filter(
      blocked => blocked.user.toString() !== currentUserId
    );
    await userToUnblock.save();

    return res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//GET BLOCKED USERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { currentUserId } = req;

    const user = await UserModel.findById(currentUserId)
      .populate("blockedUsers.user", "name username profilePicUrl");

    return res.status(200).json(user.blockedUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//CHECK IF USER IS BLOCKED
router.get("/check/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentUserId } = req;

    const currentUser = await UserModel.findById(currentUserId);
    const isBlocked = currentUser.blockedUsers.some(
      blocked => blocked.user.toString() === userId
    );

    return res.status(200).json({ isBlocked });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
