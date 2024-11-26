import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from "axios";
import StarRating from '../components/StarRating'; 

 const Home = () => {
  const [posts,setPosts]=useState([]);

  const cat=useLocation().search;

  useEffect(()=>{
    const fetchData= async ()=>{
      try{
        const res=await axios.get(`http://localhost:8800/api/posts${cat}`)
        console.log(res.data)
        setPosts(res.data);
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  },[cat]);

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(`http://localhost:8800/api/posts/${postId}/like`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: res.data.likes } : post
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  
  //  const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];

   const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
   }
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post)=>(
          <div className="post" key={post.id}>
            <div className="img"> 
              <img src={`../upload/${post.img}`} alt=""/>
            </div>
            <div className="content">
            <Link className='link' to={`/post/${post.id}`}>
            <h1>{post.title}</h1>
           </Link> 
           <StarRating rating={post.rating} />
           <p>{getText(post.desc)}</p>
            <div className='engagement'>
              {/* like button */}
              <button onClick={()=> handleLike(post.id)}>
                👍 {post.likes || 0} Likes
              </button>
               {/* comment section*/}
               <Link t0={`/post/${post.id}#comments`} className='comments-link'>
               💬 {post.commentCount || 0} Comments
               </Link>
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
