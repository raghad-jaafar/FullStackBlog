import {db} from "../db.js";

export const addLike=(req,res)=>{
const {id}=req.params;
const {user_id}=req.body;

const checkQuery ='SELECT 1 FROM likes WHERE post_id = ? AND user_id = ?';
db.query(checkQuery,[id, user_id], (err, results)=>{
    if(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
    if(results.length > 0){
        return res.status(400).json({messgae: 'User already liked this post'});
    }
    const insertQuery ='INSERT INTO likes (post_id, user_id) VALUES (?, ?)';
    db.query(insertQuery, [id,user_id], (err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({message: "Server error"});
        }
        res.status(201).json({message: 'Post liked successfully'});
    });
});
};
export const getLikeCount=(req,res)=>{
const {id}=req.params;

const query='DWLWCT COUNT(*) AS like_count FROM likes WHERE post_id=?';
db.query(query,[id],(err,results)=>{
    if(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
    res.ststus(200).json(results[0]);
});
};