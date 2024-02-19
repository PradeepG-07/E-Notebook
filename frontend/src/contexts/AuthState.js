import React, { createContext, useState } from 'react'

const AuthContext=createContext();
function AuthState(props) {
  const [loggedin, setLoggedin] = useState(localStorage.getItem('token')!==null)
  const URI = process.env.REACT_APP_AUTH_URI;
  const signUp=async(credentials)=>{
    const {name,email,password}=credentials;
    // console.log(credentials);
    try {
      const response = await fetch(`${URI}createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
      
        },
        body: JSON.stringify({name,email,password})
      });
      const json = await response.json();
      // console.log(json);
      if(json.success)
      {
        localStorage.setItem('token',json.authtoken);
        setLoggedin(true);
      }
      return json.success;
    } catch (error) {
      console.log(error.message);
    }
  }
  const login=async(email,password)=>{
    try {
      const response = await fetch(`${URI}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
         
        },
        body: JSON.stringify({email,password})
      });
      const json = await response.json();
      // console.log(json);
      if(json.success)
      {
        localStorage.setItem('token',json.authtoken);
        setLoggedin(true);
      }
      return json.success;
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <AuthContext.Provider value={{loggedin,setLoggedin,signUp,login}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {AuthState,AuthContext}