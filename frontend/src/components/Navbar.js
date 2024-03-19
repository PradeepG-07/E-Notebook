import React from 'react';
import { useContext } from 'react';
import { Link, useLocation,useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthState'
export default function Navbar(props) {
    const navigate=useNavigate();
    const context = useContext(AuthContext);
    const {loggedin,setLoggedin}=context;
    let location = useLocation();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        setLoggedin(false);
        props.showAlert("Logged out successfully","success");
        navigate("/login");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">E-Notebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link text-center ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link text-center ${location.pathname==='/notes'?"active":""}`} to="/notes">Notes</Link>
                        </li>
                    </ul>
                    <div className="mb-2 mb-lg-0 text-light d-flex justify-content-center">
                        {!loggedin&&<li className="nav-item dropdown list-unstyled">
                            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                SignUp/Login
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark border border-primary p-0" style={{left:"-40%",transform:"translateY(7px)",backgroundColor:"#282828"}} aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item p-2 px-4" to="/signup">Signup</Link></li>
                                <li><hr className="dropdown-divider border-top border-primary m-0"/></li>
                                <li><Link className="dropdown-item p-2 px-4" to="/login">Login</Link></li>
                            </ul>
                        </li>}
                        {loggedin&&<li className="nav-item list-unstyled d-flex gap-2 align-items-center">
                        <span style={{whiteSpace: "nowrap"}}>Logged in as: {localStorage.getItem('name')}</span>
                        <Link className="dropdown-item" to="/login" onClick={handleLogout}><button className="btn btn-outline-success">Logout</button>  </Link>
                        </li>}
                    </div>
                </div>
            </div>
        </nav>
    )
}
