// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import Notes from './components/Notes';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Notestate } from './contexts/Notestate';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { AuthState } from './contexts/AuthState';
import Alert from "./components/Alert";
import Spinner from "./components/Spinner";
import ScrollTopButton from './components/ScrollTopButton';
function App() {
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2500);
  }, [])
  window.addEventListener('scroll',(event)=>{
    setScrollTop(event.currentTarget.scrollY);
  })
  return (
    //TODO: Create a env file to avoid hardcoding urls ports and apis 
    // Use dotenv npm package to do it.
    <>
      {isLoading && <Spinner />}
      {!isLoading && <Notestate showAlert={showAlert}>
        <Router>
          <AuthState>
            <Navbar showAlert={showAlert} />
            <Alert alert={alert} />
            <div className='p-4 py-2' style={{ minHeight: "90vh", backgroundColor: "#000000" }}>
            {scrollTop>20&&<ScrollTopButton />}
              <div className="container p-2 text-light rounded-1" style={{ minHeight: "85vh" }}>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/notes" element={<Notes showAlert={showAlert} />} />
                  <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
                  <Route exact path="/login" element={<Login showAlert={showAlert} />} />
                </Routes>
              </div>
            </div>
          </AuthState>
        </Router>
      </Notestate>
      }
    </>
  );
}

export default App;
