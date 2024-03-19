import React,{Suspense, useEffect} from 'react'
import { Link } from 'react-router-dom'
import notebookimg from "../images/notebook.jpg"
import "../Home.css"
function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <h1 className='text-center bgmain p-4 rounded border border-warning'>Welcome to E-Notebook</h1>
      <div className="d-flex p-3 mt-4 rounded card-box bgmh border border-danger">
        <div className="w-25 card-img">
          <Suspense fallback={<Loading />}>
          <img src={notebookimg} className='w-100 h-100 rounded' alt="..." />
        </Suspense>
        </div>
        <div className="card-body ps-4 pt-2 w-75">
          <p className="card-text">Are you tired of scattered notes, forgotten ideas, and the limitations of traditional notebooks? Look no further, because E-Notebook is here to revolutionize the way you take and manage your notes!</p>
          <h2 className='text-info'>What is E-Notebook?</h2>
          <p>E-Notebook is a cutting-edge cloud-based note-taking platform that allows you to create, store, and access your notes from anywhere, at any time. Say goodbye to the hassle of losing notebooks and hello to the convenience of the cloud. With E-Notebook, your notes are always just a click away.</p>
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </div>


      <h1 className='text-center my-4 bgmain p-4 rounded border border-warning'>Key Features</h1>
      <div className="features p-3 mt-4 rounded bgmh border border-danger" >
        <div className="card-box">
          <h4>🌐Cloud Storage:</h4>
          <p className='ps-4'>&nbsp;&nbsp;Your notes are securely stored in the cloud, ensuring you never lose them.</p>
          <h4>🔒Privacy & Security:</h4>
          <p className='ps-4'>&nbsp;&nbsp;We prioritize the safety of your notes with top-notch encryption.</p>
          <h4>✨User-Friendly Interface: </h4>
          <p className='ps-4'>&nbsp;&nbsp;YA simple and intuitive design makes note-taking a breeze.</p>
          <h4>📝Edit and Delete:</h4>
          <p className='ps-4'>&nbsp;&nbsp;Easily edit and delete your notes as needed, providing total control.</p>
          <h4>🌟Customization:</h4>
          <p className='ps-4'>&nbsp;&nbsp;Personalize your notebook with themes, tags, and more.</p>
          <h4>📱Cross-Platform Access:</h4>
          <p className='ps-4'>&nbsp;&nbsp;Access your notes on any device - desktop, tablet, or mobile.</p>
          <h4>🔄Synchronization:</h4>
          <p className='ps-4'>&nbsp;&nbsp;Real-time syncing ensures your notes are always up-to-date.</p>
          <h4>👥Collaboration:</h4>
          <p className='ps-4'>&nbsp;&nbsp;Share notes and collaborate with friends, colleagues, and clients.</p>
        </div>
      </div>
    </>
  )
}

function Loading(){
  return <p>Loading...</p>
}

export default Home