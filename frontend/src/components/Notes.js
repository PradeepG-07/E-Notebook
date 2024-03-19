import React, { useContext, useEffect, useState, useRef } from 'react'
import { NoteContext } from '../contexts/Notestate'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { Navigate } from 'react-router-dom';
// import FormModalToUpdate from "./FormModalToUpdate"
function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, deleteNote, fetchNotes, editNote } = context;
  const [cnote, setCnote] = useState({ id: "", title: "", description: "", tag: "" })
  const refClose = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("editing id handle submit", cnote);
    editNote(cnote.title, cnote.description, cnote.tag, cnote.id)
    refClose.current.click();
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 400);
  }
  const handleChange = (e) => {
    setCnote({ ...cnote, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    // console.log("notes");
    if (!localStorage.getItem('token')) {
      props.showAlert("Please login/signup to continue", "warning")
    }
    else {
      fetchNotes();
    }
    // eslint-disable-next-line
  }, [])
  const editCnote = (id, title, description, tag) => {
    setCnote({ id: id, title: title, description: description, tag: tag });
  }



  return (
    <>
      {!localStorage.getItem('token') ?
        <Navigate to="/login" /> :
        <>
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content bg-dark border-2 border-danger">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                  <button type="button" className="btn-close bg-primary" data-bs-dismiss="modal" aria-label="Close" ></button>
                </div>
                <div className="modal-body ">
                  <form className='p-3 rounded' onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" className="form-control" autoComplete="off" id="title" name='title' value={cnote.title} placeholder="Give a title here" aria-describedby="emailHelp" required minLength={5} maxLength={30} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea className="form-control w-100" placeholder="Give a description here" value={cnote.description} rows={5} id="description" name='description' onChange={handleChange} required minLength={5}></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">Tag</label>
                      <input type="text" className="form-control" autoComplete="off" id="tag" name='tag' value={cnote.tag} placeholder="Give a tag here" aria-describedby="emailHelp" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <button type="submit" className="btn btn-primary me-3">Edit Note</button>
                      <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">

                </div>
              </div>
            </div>
          </div>
          <h2 className=' my-3 text-center bgmain p-3 rounded border border-warning'>Add Your Notes</h2>
          <AddNote />
          <h2 className='mt-3 text-center bgmain p-3 rounded border border-success'>Your Notes</h2>
          <p>{notes.length === 0 && "No notes to display...."}</p>
          {notes.length !== 0 && notes.map((note) => {
            return <NoteItem key={note._id} note={note} editCnote={editCnote} deleteNote={deleteNote} />
          })}
        </>
      }
    </>
  )
}

export default Notes