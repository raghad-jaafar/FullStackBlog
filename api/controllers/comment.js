import { db } from "../db.js"; // Assuming `db` is your database connection

// Get all comments for a specific post
export const getComments = (req, res) => {
  const { postId } = req.params;

  db.query(
    `SELECT c.id, c.comment, c.created_at, u.username
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.post_id = ?
     ORDER BY c.created_at DESC`,
    [postId],
    (err, comments) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(comments);
    }
  );
};


// Add a new comment
export const addComment = (req, res) => {
  const { postId } = req.params;
  const { userId, comment } = req.body;

  if (!postId || !userId || !comment) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Insert the comment
  db.query(
    'INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)', 
    [postId, userId, comment],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Fetch the newly inserted comment to send back to the client
      db.query(
        'SELECT c.id, c.comment, c.created_at, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.id = ?',
        [result.insertId],
        (err, commentDetails) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch new comment' });
          }
          res.status(200).json(commentDetails[0]); // Send back the full comment
        }
      );
    }
  );
};

