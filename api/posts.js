const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");
const router = express.Router();
const uuid = require("uuid").v4;
const {
  newLikeNotification,
  removeLikeNotification,
  newCommentNotification,
  removeCommentNotification,
} = require("../utils/notificationActions");

// Utility functions for hashtags and mentions
const extractHashtags = (text) => {
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
  const matches = text.match(hashtagRegex);
  return matches ? matches.map(tag => tag.toLowerCase()) : [];
};

const extractMentions = (text) => {
  const mentionRegex = /@[\w]+/g;
  const matches = text.match(mentionRegex);
  return matches ? matches.map(mention => mention.substring(1)) : [];
};

//CREATE A POST

router.post("/", authMiddleware, async (req, res) => {
  const { text, location, picUrl } = req.body;

  if (text.length < 1)
    return res.status(401).send("Text must be atleast 1 character");

  try {
    const hashtags = extractHashtags(text);
    const mentions = extractMentions(text);
    
    // Find mentioned users
    const mentionedUsers = await UserModel.find({
      username: { $in: mentions }
    });

    const newPost = {
      user: req.userId,
      text,
      hashtags,
      mentions: mentionedUsers.map(user => ({ user: user._id }))
    };

    if (location) newPost.location = location;
    if (picUrl) newPost.picUrl = picUrl;

    const post = await new PostModel(newPost).save();

    const postCreated = await PostModel.findById(post._id).populate("user");

    return res.json(postCreated);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

// GET ALL POSTS
router.get("/", authMiddleware, async (req, res) => {
  const { pageNumber } = req.query; //from params in axios call in fetchDataOnScroll in index.js

  const number = Number(pageNumber); //to convert pageNumber to number from string
  const size = 8; //number of posts to be sent on each page

  try {
    const { userId } = req;
    const loggedUser = await FollowerModel.findOne({ user: userId }); //-followers as we only need the following from the followerModel
    let posts = [];

    if (number === 1) {
      if (loggedUser.following.length > 0) {
        posts = await PostModel.find({
          user: {
            $in: [
              userId,
              ...loggedUser.following.map((following) => following.user),
            ],
          },
        })
          .limit(size) //limit is used to limit the posts fetched to size(i.e. we defined as 8 above)
          .sort({ createdAt: -1 }) //-1 is for descending order, i.e. newest first
          .populate("user")
          .populate("comments.user");
        //$in operator is a MongoDB operator, and it needs an array to compare the values, and $in needs atleast two values to work
        //this means find all posts in postModel with user = userId
        //since map returns an array, we spread the values using the spread operator
        //we can say .populate('user') and that'll fill the user field in the response with all the details of Jane from UserModel
        //without populate, we'd get user: <<userIdFromUserModel>>. With populate, we get the whole user
      }

      //IF user is not following anyone
      else {
        posts = await PostModel.find({ user: userId })
          .limit(size)
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("comments.user");
      }
    } else {
      //to skip over the posts that were sent earlier
      const skips = size * (number - 1); //say pageNum is 3. so, we'll have to skip 8 * (3-1) or 8*2 posts, bc 16 posts have already been fetched for 1st and 2nd pages in total
      if (loggedUser.following.length > 0) {
        posts = await PostModel.find({
          user: {
            $in: [
              userId,
              ...loggedUser.following.map((following) => following.user),
            ],
          },
        })
          .skip(skips)
          .limit(size)
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("comments.user");
      }
      //IF user is not following anyone
      else {
        posts = await PostModel.find({ user: userId })
          .skip(skips)
          .limit(size)
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("comments.user");
      }
    }
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//GET POST BY ID
router.get("/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId)
      .populate("user")
      .populate("comments.user");

    if (!post) {
      return res.status(404).send("Post not found");
    }

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//DELETE POST by ID
router.delete("/:postId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req; //got this from authMiddleware
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const user = UserModel.findById(userId);

    //if some user other than logged in user tries to delete a post
    if (post.user._id.toString() !== userId) {
      if (user.role === "root") {
        await post.remove();
        return res.status(200).send("Post deleted successfully");
      } else {
        return res.status(401).send("Unauthorized");
      }
    }

    await post.remove();
    return res.status(200).send("Post deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//LIKE A POST by ID
router.post("/like/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req; //from authMiddleware
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("No Post found");
    }

    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length > 0; //filter returns a new array with all the elements that pass the test

    if (isLiked) {
      return res.status(401).send("Post already liked");
    }

    await post.likes.unshift({ user: userId }); //adds new items to the beginning of the original array and returns the new length
    //we used an object inside of unshift bc in PostModel we have defined an object inside of likesArray
    await post.save();

    //check if post that's being liked was made by logged in user
    //otherwise SEND NOTIFICATION
    if (post.user.toString() !== userId) {
      await newLikeNotification(userId, postId, post.user.toString());
    }

    return res.status(200).send("Post liked");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//UNLIKE A POST by ID
router.put("/unlike/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req; //from authMiddleware
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("No Post found");
    }

    const isLikedIndex = post.likes.findIndex(
      (like) => like.user.toString() === userId
    );

    if (isLikedIndex === -1) {
      return res.status(400).send("Can't unlike a post that hasn't been liked");
    } else {
      await post.likes.splice(isLikedIndex, 1); //delete that element

      await post.save();

      //check if post that's being disliked was made by logged in user and it's being disliked by logged in user
      //otherwise SEND NOTIFICATION
      if (post.user.toString() !== userId) {
        await removeLikeNotification(userId, postId, post.user.toString());
      }
      return res.status(200).send("Post unliked");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//GET ALL LIKES FOR A POST
router.get("/like/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await PostModel.findById(postId).populate("likes.user"); //populate will replace the userID with the user Object(which has all the user details)
    if (!post) {
      return res.status(404).send("No Post found");
    }

    return res.status(200).json(post.likes);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//CREATE A COMMENT

router.post("/comment/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const { userId } = req;

    if (text.length < 1)
      return res.status(401).send("Comment should be atleast 1 character");

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("No Post found");
    }

    const newComment = {
      _id: uuid(),
      text,
      user: req.userId,
      date: Date.now(),
    };

    await post.comments.unshift(newComment);
    await post.save();

    if (post.user.toString() !== userId) {
      await newCommentNotification(
        postId,
        newComment._id,
        userId,
        post.user.toString(),
        text
      );
    }
    return res.status(200).json(newComment._id);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//DELETE COMMENT

router.delete("/:postId/:commentId", authMiddleware, async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("No Post found");
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment._id === commentId
    ); //we didn't do toString() here bc comment._id is declared as String in the PostModel

    if (commentIndex === -1) {
      return res.status(404).send("Comment not found");
    }

    const user = await UserModel.findById(userId);

    const comment = post.comments[commentIndex];
    //if comment is made by someone other than the logged in user, i.e. this user doesn't have permission to delete this comment
    if (comment.user.toString() !== userId) {
      if (user.role === "root") {
        await post.comments.splice(commentIndex, 1);
        await post.save();
        return res.status(200).send("Comment deleted successfully");
      } else {
        return res.status(401).send("Unauthorized");
      }
    }

    await post.comments.splice(commentIndex, 1);
    await post.save();

    if (post.user.toString() !== userId) {
      await removeCommentNotification(
        postId,
        commentId,
        userId,
        post.user.toString()
      );
    }

    return res.status(200).send("Comment deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//ADD REACTION TO POST
router.post("/reaction/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const { type } = req.body;
    
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Remove existing reaction from this user
    post.reactions = post.reactions.filter(reaction => reaction.user.toString() !== userId);
    
    // Add new reaction
    post.reactions.unshift({ user: userId, type });
    await post.save();

    // Send notification if not the post owner
    if (post.user.toString() !== userId) {
      await newLikeNotification(userId, postId, post.user.toString());
    }

    return res.status(200).json({ message: "Reaction added", reactions: post.reactions });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//REMOVE REACTION FROM POST
router.delete("/reaction/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    post.reactions = post.reactions.filter(reaction => reaction.user.toString() !== userId);
    await post.save();

    return res.status(200).json({ message: "Reaction removed", reactions: post.reactions });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//BOOKMARK POST
router.post("/bookmark/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const isBookmarked = post.bookmarks.some(bookmark => bookmark.user.toString() === userId);
    
    if (isBookmarked) {
      return res.status(401).send("Post already bookmarked");
    }

    post.bookmarks.unshift({ user: userId });
    await post.save();

    return res.status(200).json({ message: "Post bookmarked" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//REMOVE BOOKMARK
router.delete("/bookmark/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    post.bookmarks = post.bookmarks.filter(bookmark => bookmark.user.toString() !== userId);
    await post.save();

    return res.status(200).json({ message: "Bookmark removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//GET BOOKMARKED POSTS
router.get("/bookmarks", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    
    const posts = await PostModel.find({
      "bookmarks.user": userId
    })
    .populate("user")
    .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//GET POSTS BY HASHTAG
router.get("/hashtag/:hashtag", authMiddleware, async (req, res) => {
  try {
    const { hashtag } = req.params;
    
    const posts = await PostModel.find({
      hashtags: { $in: [hashtag] }
    })
    .populate("user")
    .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//GET TRENDING HASHTAGS
router.get("/trending/hashtags", authMiddleware, async (req, res) => {
  try {
    const hashtags = await PostModel.aggregate([
      { $unwind: "$hashtags" },
      { $group: { _id: "$hashtags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    return res.status(200).json(hashtags);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//SEARCH POSTS
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).send("Search query is required");
    }

    const posts = await PostModel.find({
      $or: [
        { text: { $regex: q, $options: 'i' } },
        { hashtags: { $in: [new RegExp(q, 'i')] } }
      ]
    })
    .populate("user")
    .sort({ createdAt: -1 })
    .limit(20);

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
