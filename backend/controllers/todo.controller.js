import Post from "../models/todo.model.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    // yahan se user id le rahe hain jo auth middleware ne set ki hai
    const newPost = new Post({
      title,
      description,
      userId: req.user.id,  
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get All Posts (with populated user)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name email"); 
    // 2nd argument: specify which fields of User to return

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
