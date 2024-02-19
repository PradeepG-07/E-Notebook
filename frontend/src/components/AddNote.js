import React, { useContext, useState } from 'react'
import { NoteContext } from '../contexts/Notestate';

function AddNote() {
    const [cnotes, setCnotes] = useState({title:"",description:"",tag:""});
    const Context=useContext(NoteContext);
    const {addNote}=Context;
    const handleSubmit=(e)=>{
        e.preventDefault();
        addNote(cnotes);
        setCnotes({title:"",description:"",tag:""})
        window.scrollTo(0,0)
    }
    const handleChange=(e)=>{
        setCnotes({...cnotes,[e.target.name]:e.target.value})
    }
    return (
        <form className='p-3 rounded border border-warning' style={{backgroundColor:"#282828"}} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name='title' value={cnotes.title} placeholder="Give a title here" aria-describedby="emailHelp" onChange={handleChange} required minLength={5} maxLength={30}/>
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control w-100" placeholder="Give a description here" value={cnotes.description} rows={5} id="description" name='description' onChange={handleChange} required minLength={5}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name='tag' value={cnotes.tag} placeholder="Give a tag here" aria-describedby="emailHelp" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Add note</button>
        </form>
    )
}

export default AddNote