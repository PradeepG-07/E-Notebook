import React from 'react'

function Spinner() {
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status" style={{height:"10vh",width:"10vh"}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner