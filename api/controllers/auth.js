import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register=(req,res)=>{
     console.log(req.body); // Add this line at the start of the register function
//CHECK EXISTING USER
const q= "SELECT * FROM users WHERE email = ? OR username = ? "

db.query(q,[req.body.email, req.body.name],(err,data)=>{
   

    if(err) return res.json(err)
    if(data.length) return res.status(409).json("user already exists!");

        //Hash the password and create a user
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
    const q="INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values=[
        req.body.username,
        req.body.email,
        hash,
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
    return res.status(200).json("User has been created.")
    });
});
};

export const login=(req,res)=>{
    //CHECK IF USER EXISTES
    const q="SELECT * FROM users WHERE username=? "

    db.query(q,[req.body.username], (err,data)=>{
     if(err) return res.json(err);
     if((data.length)==0) return res.status(404).json("user not found");

     //check password
     const isPasswordCorrect=bcrypt.compareSync(req.body.password, data[0].password);
     if(!isPasswordCorrect) return res.status(400).json("Wrong username or password")
   
    const token=jwt.sign({id:data[0].id},"jwtkey");
    const {password, ...other}= data[0]

    res.cookie("access_token", token, {
        httpOnly: true, // Makes sure the cookie is not accessible from client-side JavaScript
        secure: process.env.NODE_ENV === 'production', // Ensure it's only sent over HTTPS in production
        sameSite: 'Lax', // 'Lax' or 'None' based on your CORS policy
      }).status(200).json(other);

    });
};
export const logout=(req,res)=>{
   res.clearCookie("access_token", {
  sameSite: "None", // Same here, change to 'Lax' or 'Strict' if not using cross-site requests
  secure: process.env.NODE_ENV === 'production', // Secure in production
}).status(200).json("User has been logged out.");
};