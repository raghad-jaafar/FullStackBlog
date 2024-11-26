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
  const [post, setPost] = useState(null); // Initialize as null
  const [comments, setComments] = useState([]); // Comments list
  const [newComment, setNewComment] = useState(""); // New comment input
  const [error, setError] = useState(null); // Error handling

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
        setPost(res.data);
        const commentsRes = await axios.get(
          `http://localhost:8800/api/posts/${postId}/comments`
        );
        setComments(commentsRes.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load the post or comments. Please try again later.");
      }
    };
    fetchData();
  }, [postId]);

   // Handle like functionality
   const handleLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8800/api/posts/${postId}/like`
      );
      setPost((prevPost) => ({
        ...prevPost,
        likes: res.data.likes,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8800/api/posts/${postId}/comments`,
        { text: newComment },
        { withCredentials: true }
      );
      setComments((prevComments) => [...prevComments, res.data]);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
        withCredentials: true // Include cookies with the request
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  if (!post) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className='single'>
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post?.username ? post.username : "Loading..."}</span>
            <p>Posted {post?.date ? moment(post.date).fromNow() : "N/A"}</p>
          </div>

          {currentUser?.username === post?.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <div className="engagement">
          {/* Like button */}
          <button onClick={handleLike}>👍 {post.likes || 0} Likes</button>
        </div>
        <div className="star-rating"><StarRating rating={post.rating}  /> </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>
       {/* Comments Section */}
       <div className="comments">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <strong>{comment.username}</strong>
            <p>{comment.text}</p>
            <span>{moment(comment.date).fromNow()}</span>
          </div>
        ))}

        {currentUser && (
          <form className="add-comment" onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
