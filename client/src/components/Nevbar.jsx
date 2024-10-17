import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import Logo from "../img/logo2.png";
import { AuthContext } from '../context/authContext';

const Nevbar = () => {
  const{currentUser,logout} =useContext(AuthContext);
  return (
    <div className='nevbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
           <img src={Logo} alt=""/>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
          <h6>FICTION</h6>
          </Link> 
          <Link className="link" to="/?cat=science">
          <h6>SCIENCE FICTION</h6>
          </Link> 
          <Link className="link" to="/?cat=technology">
          <h6>ROMANCE</h6>
          </Link> 
          <Link className="link" to="/?cat=cinema">
          <h6>NON-FICTION</h6>
          </Link> 
          <Link className="link" to="/?cat=design">
          <h6>YOUNG ADULT</h6>
          </Link> 
          <Link className="link" to="/?cat=food">
          <h6>FANTASY</h6>
          </Link> 
          
          <span>{currentUser?.username}</span>
         {currentUser? <span onClick={logout}>Logout</span>: 
         <Link className='link' to="/login">Login</Link>}
          <span className="write">
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Nevbar
