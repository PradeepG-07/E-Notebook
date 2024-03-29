import React, { useContext, useState,useEffect } from 'react'
import { AuthContext } from '../contexts/AuthState';
import { useNavigate,Link } from 'react-router-dom';

function SignUp(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(AuthContext);
    const navigate=useNavigate();
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const {signUp}=context;
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSignup=async(e)=>{
        e.preventDefault();
        // console.log(props);
        setIsLoading(true);
       const response= await signUp(credentials);
       setIsLoading(false);
       console.log(response);
       if(response.success)
       {
        props.showAlert("Account Created Successfully","success");
       }
        else{
            response.exists?props.showAlert(`Account already exists with ${credentials.email}. Login to continue`,"info"):props.showAlert(`Failed to create an account. Please try again.`,"info")
        }
        navigate("/notes");
    }
    return (
        <form className='p-3 rounded border border-warning' onSubmit={handleSignup} style={{ backgroundColor: "#282828"}} autoComplete="on">
            <h2>Signup</h2>
            <div className="my-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" required onChange={handleChange} autoComplete="on"/>
            </div>
            <div className="my-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email"  name="email" aria-describedby="emailHelp" required onChange={handleChange} autoComplete="on"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' minLength={8} maxLength={15} onChange={handleChange} required autoComplete="on"/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name='cpassword' minLength={8} maxLength={15} onChange={handleChange} required autoComplete="on"/>
            </div>
            <button type="submit" className="btn btn-primary" style={{minWidth: "80px",fontSize:"18px",pointerEvents: isLoading?"none":"auto"}}>
            {
                isLoading?
                <div className="spinner-border text-secondary" style={{width: "1.5rem", height: "1.5rem"}} role="status" >
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <span>Create an Account</span>
            }
            </button>
            <div className="d-flex p-2 justify-content-end ">
            <span>Already have an account?&nbsp;<Link className='text-success' to="/login">Login</Link></span>
        </div>
        </form>
    )
}

export default SignUp