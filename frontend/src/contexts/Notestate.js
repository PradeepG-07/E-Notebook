import React from 'react';
import { createContext, useState } from 'react';

const NoteContext = createContext();
function Notestate(props) {
  const URI = process.env.REACT_APP_NOTES_URI;
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${URI}fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authtoken": localStorage.getItem('token')
        },
      });
      const json = await response.json();

      setNotes(json.notes!==undefined?json.notes:[])
      // console.log(json.notes);
    } catch (error) {
      console.log(error.message);
    }
  }
  const addNote = async (note) => {
    const {title,description,tag}=note;
    if(tag===""){
     note={title,description};
    }
    try {
      const response = await fetch(`${URI}addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authtoken": localStorage.getItem('token')
        },
        body: JSON.stringify(note)
      });
      const json = await response.json();
      // console.log(json);
      if(json.success){
        setNotes([...notes,json])
        props.showAlert("Notes added successfully","success");
      }
      else{
        props.showAlert(json.message,"info");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  const deleteNote = async (noteid) => {
    try {
      const response = await fetch(`${URI}deletenotes/${noteid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authtoken": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      if(json.success){
        setNotes(notes.filter((note)=>{return note._id!==noteid}))
        props.showAlert("Notes deleted successfully","success")
      }
      else{
        props.showAlert(json.message,"info");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  const editNote = async (title,description,tag,id) => {
    let updatednote={title,description,tag}
    try {
      const response = await fetch(`${URI}updatenotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authtoken": localStorage.getItem('token')
        },
        body: JSON.stringify(updatednote)
      });
      const json = await response.json();
      if(json.success){
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag; 
            break; 
          }
        }  
        setNotes(newNotes);
        props.showAlert("Notes updated successfully","success");
    }
      else{
        props.showAlert(json.message,"info");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  

  return (
    <NoteContext.Provider value={{ notes, setNotes, fetchNotes, addNote,deleteNote,editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export { Notestate, NoteContext }