import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import StarRating from '../components/StarRating.jsx'; 
const Write = () => {

const state=useLocation().state
const [value, setValue] = useState(state?.desc || '');
const [title, setTitle] = useState(state?.title || '');   
const [file, setFile] = useState(null);
const [cat, setCat] = useState(state?.cat || '');
const [rating, setRating] = useState(0); // State to hold the rating

const navigate=useNavigate()

 const upload= async ()=>{
  try {

    const formData=new FormData()
    formData.append("file", file)
 

    const res = await axios.post("http://localhost:8800/api/upload", formData, {
      withCredentials: true, // Include credentials in the request
    }, {
      headers: {
        'Content-Type': 'multipart/form-data' // Important for file uploads
      }
    });
    return res.data.filename;
  } catch (err) {
    console.log(err)
  }
 };



const handleClick= async (e)=>{
  e.preventDefault();
  const imgUrl = await upload();
  try {
    const postData = {
      title,
      desc: value,
      cat,
      img: file ? imgUrl : undefined, // Set img to undefined if no file is uploaded
      rating, // Include rating in the post data
    };

    if (state) {
      // Update the existing post
      await axios.put(`http://localhost:8800/api/posts/${state.id}`, postData, {
        withCredentials: true, // Include credentials in the request
      });
    } else {
      // Create a new post
      await axios.post(`http://localhost:8800/api/posts/`, {
        ...postData,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      }, {
        withCredentials: true, // Include credentials in the request
      });
    }
    navigate("/");
  } catch (err) {
    console.log(err);
  }
 }

  return (
    <div className="add">
      <div className="content">
        <input 
          type="text"
          placeholder="Title" 
          value={title} 
          onChange={e=>setTitle(e.target.value)}
        />
        <StarRating rating={rating}   onChange={setRating} />
        <div className="editorContainer">
      <ReactQuill 
       className="editor" 
       theme="snow" 
       value={value} 
       onChange={setValue}
      />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status</b> Draft
          </span>
          <span>
            <b>Visibility</b> Public
          </span>
          <input 
           style={{display:"none"}}
           type="file"
           id="file"
           name=""
           onChange={e=>setFile(e.target.files[0])}/>
          <label className="file" htmlFor="file">
            Upload Image
            </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>

        <div className="item">
        <h1>Category</h1>
        <div className="cat"> 
        <input type="radio" checked={cat==="art"} name="cat" value="art" id="art" onChange={e=>setCat(e.target.value)}/>
        <label htmlFor="art">Fiction</label>
        </div>
        <div className="cat"> 
          <input type="radio" checked={cat==="science"} name="cat" value="science" id="science" onChange={e=>setCat(e.target.value)}/>
        <label htmlFor="science">Science Fiction</label>
        </div>
        <div className="cat">
        <input type="radio" checked={cat==="technology"} name="cat" value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
        <label htmlFor="technology">Romance</label>
        </div>
        <div className="cat">
        <input type="radio" checked={cat==="cinema"} name="cat" value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}/>
        <label htmlFor="cinema">Non-Fiction</label>
        </div>
        <div className="cat">
        <input type="radio" checked={cat==="design"} name="cat" value="design" id="design" onChange={e=>setCat(e.target.value)}/>
        <label htmlFor="design">Young Adult</label>
        </div>
        <div className="cat">
        <input type="radio" checked={cat==="food"} name="cat" value="food" id="food" onChange={e=>setCat(e.target.value)}/>
        <label htmlFor="food">Fantasy</label>
        </div>
        </div>
      </div>
    </div>
  )
}
export default Write;

