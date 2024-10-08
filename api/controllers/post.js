import {db} from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts=(req,res)=>{
   const q= req.query.cat 
   ?"SELECT * FROM posts where cat=?" : 
   "SELECT * FROM posts";
   db.query(q, [req.query.cat], (err,data)=>{
    if(err) return res.status(500).send(err);
    
    return res.status(200).json(data);
});
};
export const getPost=(req,res)=>{
    const q = "SELECT p.id, u.username, p.title, p.desc, p.img, u.img AS userImg, p.cat, p.rating, p.date FROM blog.users u JOIN blog.posts p ON u.id = p.uid WHERE p.id = ?";
  
    db.query(q,[req.params.id], (err,data)=>{
    if(err)return res.status(500).json(err)
   
   
        return res.status(200).json(data[0]);
 });
};
export const addPost=(req,res)=>{
    console.log("Incoming request body:", req.body); // Log the incoming request body
    const token=req.cookies.access_token

    if(!token) return res.status(401).json("Not authenticated!")
    jwt.verify(token,"jwtkey", (err, userInfo)=>{
     if(err) return res.status(403).json("Token is not valid!")

    const q="INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`,`rating`) VALUES (?)"
    const values=[
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.date,
        userInfo.id,
        req.body.rating || 0, // Add the rating or default to 0
    ];
    db.query(q,[values], (err,data)=>{
    if(err) {
        console.log("Database error:", err);
        return res.status(500).json(err)}
    return res.json("Post has been created.")
    });
});
};
export const deletePost=(req,res)=>{ //fix delete i think cookies not working
const token=req.cookies.access_token

if(!token) return res.status(401).json("Not authenticated!")
    
jwt.verify(token,"jwtkey", (err, userInfo)=>{
 if(err) return res.status(403).json("Token is not valid!")

const postId=req.params.id
const q="DELETE FROM posts WHERE `id`=? AND `uid` =? "
db.query(q,[postId, userInfo.id],(err,data)=>{
    if(err) return res.status(403).json("You can delete only your post!")
    
    return res.json("Post has been deleted.");
    });
} );
};
export const updatePost=(req,res)=>{
    const token=req.cookies.access_token

    if(!token) return res.status(401).json("Not authenticated!")
    
    jwt.verify(token,"jwtkey", (err, userInfo)=>{
     if(err) return res.status(403).json("Token is not valid!")

    const  postId=req.params.id;
    const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=IFNULL(?, `img`), `cat`=?, `rating`=IFNULL(?, `rating`) WHERE `id`=? AND `uid`=?";
    const values=[
        req.body.title,
        req.body.desc,
        req.body.img || null,
        req.body.cat,
        req.body.rating || 0,
    ];
    db.query(q,[...values, postId, userInfo.id], (err,data)=>{
    if(err) return res.status(500).json(err)
    return res.json("Post has been updated.")
    });
});
};