import React, { useContext,useRef,useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthState'
import { useNavigate,Link } from 'react-router-dom';

function Login(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(AuthContext);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const {login}=context;
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        const email=emailRef.current.value;
        const password=passwordRef.current.value;
        let successfullLogin=await login(email,password);
        setIsLoading(false);
        if(successfullLogin){
            props.showAlert("Logged in successfully","success");
            // await getUserDetails();
            navigate("/notes");
        }
        else{
            props.showAlert("Invalid Credentials","info");
        }
        
    }
    return (
        <>
        <form className='p-3 rounded border border-warning' onSubmit={handleSubmit} style={{backgroundColor:"#282828",transform:"translateY(10%)"}}>
            <h2>Login</h2>
            <div className="my-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp"  ref={emailRef} required autoComplete="on"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name='password' className="form-control" id="password"  ref={passwordRef} required autoComplete="on"/>
            </div>
            <button type="submit" className="btn btn-primary" style={{minWidth: "80px",fontSize:"18px",pointerEvents: isLoading?"none":"auto"}}>
            {
                isLoading?
                <div className="spinner-border text-secondary" style={{width: "1.5rem", height: "1.5rem"}} role="status" >
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <span>Login</span>
            }
            </button>
        <div className="d-flex p-2 justify-content-end flex-wrap">
            <span>New to E-notebook?&nbsp;</span><Link to="/signup">Create Account</Link>
        </div>
        </form>
        </>
    )
}

export default Login