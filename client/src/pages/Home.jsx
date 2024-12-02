import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import StarRating from '../components/StarRating';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
        console.log(res.data);
        // Initialize comments and likeCount as empty array/0 if not provided
        const postsWithCommentsAndLikes = res.data.map(post => ({
          ...post,
          comments: post.comments || [],
          commentCount: post.commentCount || 0,
          likeCount: post.likeCount || 0 // Ensure likeCount is present
        }));
        setPosts(postsWithCommentsAndLikes);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch posts');
      }
    };

    fetchData();
  }, [cat]);

  // Handle like button click
  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:8800/api/posts/likes/${postId}`);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
      ));
    } catch (err) {
      console.log(err);
    }
  };

  // Handle new comment submission
  const handleCommentSubmit = async (postId, comment) => {
    try {
      const res = await axios.post(`http://localhost:8800/api/posts/comments/${postId}`, { comment });
     setPosts(posts.map(post => 
        post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
      ));
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {error && <p>{error}</p>}
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`http://localhost:8800/upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <StarRating rating={post.rating} />
              <p>{getText(post.desc)}</p>

             {/* Display likes and comments */}
             <div className="likes-comments">
                <span>{post.likeCount} 🧡</span> {/* Display like count */}
                <span>{post.commentCount} 💬</span> {/* Display comment count */}
              </div>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
