import React, { createContext, useState } from 'react'

const AuthContext=createContext();
function AuthState(props) {
  const [loggedin, setLoggedin] = useState(localStorage.getItem('token')!==null);
  const URI = process.env.REACT_APP_AUTH_URI;
  const signUp=async(credentials)=>{
    const {name,email,password}=credentials;
    // console.log(credentials);
    try {
      const response = await fetch(`${URI}signup`, {
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
      return json;
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
        await getUserDetails();
        setLoggedin(true);
      }
      return json.success;
    } catch (error) {
      console.log(error.message);
    }
  }
  const getUserDetails=async()=>{
    try {
      const response = await fetch(`${URI}getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authtoken": localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      if(!json.error)
      {
       localStorage.setItem('name',json.name);
       localStorage.setItem('email',json.email);
      }
      else{
        localStorage.setItem('name',"Error occurred while fetching details");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <AuthContext.Provider value={{loggedin,setLoggedin,signUp,login,getUserDetails}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {AuthState,AuthContext}