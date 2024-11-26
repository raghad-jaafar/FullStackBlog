import {db} from "../db.js";

export const addComment=(req,res)=>{
const {id}= req.params;
const {user_id, content}=req.body;

const query='INSERT INTO comments (post_id, user_id, content) VALUES (?,?,?)';
db.query(query, [id, user_id, conetent], (err, result)=>{
    if(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
    res.status(201).json({message: 'Comment added successfully', commentId: result.insertId});
});
};

export const getComments=(req,res)=>{
const {id}=req.params;

const query= `
SELECT c.id, c.content, c.created_at, u.username
FROM comments c
JOIN users u ON c.user_id=u.id
WHERE c.post_id =?
`;
db.query(query, [id], (err, results)=>{
    if(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
    res.status(200).json(results);
})
};