import { db } from "../db.js"; // Assuming `db` is your database connection

// Like a post
// Like a post
export const likePost = (req, res) => {
    const { postId } = req.params;   // Extract postId from URL
    const { userId } = req.body;    // Extract userId from body

    db.query(
      "SELECT * FROM users WHERE id = ?",
      [userId],
      (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (user.length === 0) return res.status(400).json({ message: "User not found" });

      // Check if the user has already liked the post
      db.query(
        "SELECT * FROM likes WHERE post_id = ? AND user_id = ?",  // `user_id` in `likes` table, `id` in `users` table
        [postId, userId], 
        (err, existingLike) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (existingLike.length > 0) {
            return res.status(400).json({ message: "You have already liked this post" });
          }

          // Insert like
          db.query(
            "INSERT INTO likes (post_id, user_id) VALUES (?, ?)",  // Insert into `likes` table
            [postId, userId], 
            (err, result) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              res.status(201).json({ message: "Post liked!" });
            }
          );
        }
      );
    }
  );
};


// Unlike a post
export const unlikePost = (req, res) => {
  const { postId, userId } = req.params;

  db.query(
    "SELECT * FROM likes WHERE post_id = ? AND user_id = ?", 
    [postId, userId], 
    (err, existingLike) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (existingLike.length === 0) {
        return res.status(400).json({ message: "You haven't liked this post" });
      }

      db.query(
        "DELETE FROM likes WHERE post_id = ? AND user_id = ?", 
        [postId, userId], 
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(200).json({ message: "Post unliked!" });
        }
      );
    }
  );
};

// Get likes count for a post
export const getLikes = (req, res) => {
  const { postId } = req.params;

  db.query(
    "SELECT COUNT(*) AS like_count FROM likes WHERE post_id = ?", 
    [postId], 
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(result[0]);  // Assuming you want to return the like count object
    }
  );
};
