import React, { useState } from 'react'

function NoteItem(props) {
    const note=props.note;
    const [isLoading, setIsLoading] = useState(false);
    const handleDelete = async() => {
        setIsLoading(true);
        await props.deleteNote(note._id);
        setIsLoading(false);
        window.scrollTo(0,0)
    }
    const handleEdit=async()=>{
        props.editCnote(note._id,note.title,note.description,note.tag);
    }
    
    return (
        <>
            <div className="card w-100 w-50 px-2 my-3 border border-success mx-md-auto" style={{ backgroundColor: "#282828" }}>
                <div className="card-body text-light" >
                    <h5 className="card-title"><span className='text-info' style={{ fontSize: "19px", fontWeight: "bold" }}>Title : </span>{note.title}</h5>
                    <div className="card-text"><span className='text-danger' style={{ fontSize: "19px", fontWeight: "bold" }}>Description :</span><br /><p className='px-5 mb-1'>{note.description}</p></div>
                    <p className="card-text"><span className='text-primary' style={{ fontSize: "19px", fontWeight: "bold" }}>Tag : </span>{note.tag}</p>
                    <button type="button" className="btn btn-outline-warning me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline-danger" onClick={handleDelete}>
                   {
                     isLoading?
                     <div className="spinner-border text-secondary" style={{width: "1.5rem", height: "1.5rem"}} role="status" >
                         <span className="visually-hidden">Loading...</span>
                     </div>
                     :
                     <span>Delete</span>
                   }
                    </button>
                </div>
            </div>
        </>
    )
}

export default NoteItem