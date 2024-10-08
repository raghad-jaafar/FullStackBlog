import express from "express"
import cors from "cors"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import multer from "multer"

const app= express()

// Make the upload folder publicly accessible
app.use('/upload', express.static('../client/public/upload'));

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from your frontend
    ,credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  }));

const storage= multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,'../client/public/upload')
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)
  },
});

const upload=multer({storage})

app.post('/api/upload', upload.single('file'), function(req,res){
  const file=req.file;
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
}
res.status(200).json({ filename: file.filename });

})

app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


app.listen(8800,()=>{
    console.log("Connected!")
});