import axios from "axios";
import { useState,createContext, useEffect } from "react";

export const AuthContext= createContext()

export const AuthContextProvider=({children})=>{
     const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user")) || null)
    
    const login = async(inputs)=>{
      try {
         // Include withCredentials to handle cookies
         const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
             withCredentials: true, // Ensure cookies are sent/received
         });
         setCurrentUser(res.data);
     } catch (err) {
         // Optionally, handle errors here
         console.error("Login error:", err);
     }
    };
    
    const logout = async(inputs)=>{
      try {
         await axios.post("http://localhost:8800/api/auth/logout", {}, {
             withCredentials: true, // Ensure cookies are sent/received during logout
         });
         setCurrentUser(null);
     } catch (err) {
         console.error("Logout error:", err);
     }
     };
    useEffect(()=>{
     localStorage.setItem("user", JSON.stringify(currentUser));
     },[currentUser]);

     return (
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
            </AuthContext.Provider>
     );
    };