import React from 'react';
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
const Login = () => {
  const [inputs, setInputs]=useState({
    username:"",
    password:""
  })
  const [err,setError]=useState(null);

  const navigate=useNavigate();

  const{login} =useContext(AuthContext);

  const handleChange=e=>{
  setInputs(prev=>({
    ...prev,[e.target.name]:e.target.value}))
  };

const handleSubmit=async e=>{
  e.preventDefault();

  try{
    await login(inputs);
    navigate("/");
  }catch(err){
    if (err.response && err.response.data) {
      setError(err.response.data);
    } else {
      setError("An unexpected error occurred. Please try again later.");
    }
  }
};
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder="username"name="username" onChange={handleChange}/>
        <input required type="password" placeholder="password" name="password"onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>Don't you have an account? <Link to="/register">Register</Link></span>
      
      </form>
    </div>
  );
};

export default Login;
