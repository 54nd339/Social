const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const router = express.Router();

//SEARCH USERS
router.get("/:searchTerm", authMiddleware, async (req, res) => {
  try {
    const { searchTerm } = req.params;
    
    if (!searchTerm) {
      return res.status(400).send("Search term is required");
    }

    const users = await UserModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { username: { $regex: searchTerm, $options: 'i' } }
      ]
    })
    .select("name username profilePicUrl")
    .limit(10);

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;