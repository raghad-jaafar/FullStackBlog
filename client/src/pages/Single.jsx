import React, { useContext, useEffect, useState } from 'react';
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from "../components/Menu";
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import DOMPurify from "dompurify";
import StarRating from '../components/StarRating';

const Single = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]); // Add this
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(post.likes || 0);  // Manage likes state

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
 

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`, {}, { withCredentials: true });
        setPost(res.data);
        setLikes(res.data.like_count); // Set the likes based on fetched data
      } catch (err) {
        console.log(err);
        setError('Failed to fetch post');
      }
    };
    fetchData();
  }, [postId]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/comments/${postId}`, { withCredentials: true });
        console.log(comments);

        setComments(res.data); // Update comments state
      } catch (err) {
        console.log(err);
        setError('Failed to fetch comments');
      }
    };
    fetchComments();
  }, [postId]);

  // Handle like button click
  const handleLike = async () => {
    try {
      
      const res = await axios.post(
        `http://localhost:8800/api/likes/${postId}`, // Correct path for liking a post
        {  userId: currentUser.id }, // Assuming you need to send the userId to like the post
        { withCredentials: true,
          headers: { 'Content-Type': 'application/json' }  // Set content type explicitly
         } // Include cookies
      );
      
      setLikes(like_count);  // Update likes in UI
    } catch (err) {
      console.log(err);
      setError('Failed to like post');
    }
  };

  // Handle comment input change
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
  
    const tempComment = {
      id: Date.now(), // Temporary ID
      comment: newComment,
      username: currentUser.username, // Use `username` from `currentUser`
      created_at: new Date().toISOString(), // Temporary timestamp
    };
  
    setComments((prevComments) => [tempComment, ...prevComments]); // Optimistic update
  
    try {
      const res = await axios.post(
        `http://localhost:8800/api/comments/${postId}`,
        { userId: currentUser.id, comment: newComment },
        { withCredentials: true }
      );
  
      // Replace the temporary comment with the server response
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === tempComment.id ? { ...tempComment, ...res.data } : comment
        )
      );
      setNewComment(''); // Clear the input
    } catch (err) {
      console.error(err);
      setError('Failed to add comment');
      // Optionally, remove the temporary comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== tempComment.id)
      );
    }
  };
  
  
  
  


  // Handle post delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>

          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} />
            </div>
          )}
        </div>

        <StarRating rating={post.rating} />
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>

        {/* Like button and count */}
        <div className="likes-comments">
          <button onClick={handleLike}>Like</button>
          <span>{likes} Likes</span>

  {/* Comments Section */}
  <div className="comments">
          <h3>Comments</h3>
          <ul>
  {comments.length > 0 ? (
    comments.map((comment) => (
      <li key={comment.id || comment.created_at}> {/* Add unique key here */}
        <strong>{comment.username}</strong>: {comment.comment}
        <br />
        <small>{moment(comment.created_at).fromNow()}</small>
      </li>
    ))
  ) : (
    <p>No comments yet</p>
  )}
</ul>

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        </div>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
