import { validationResult,matchedData } from 'express-validator';
import NotesModel from "../models/Notes.js";

export const fetchNotes=async (req, res) => {
    try {
     
        const notes = await NotesModel.find({ user: req.user.id });
        res.status(200).json({success: true, notes });
    } catch (error) {
        console.log("Internal server error occurred");
        console.log(error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
} 
export const addNote=async (req, res) => {
    const { tag } = req.body;
    // Verifying the validations and sanitizers
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors);
    }
    const {title,description}=matchedData(req);
    try {
        let notes = await NotesModel.create({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag
        })
        res.status(201).json({success:true,notes});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}
export const updateNote=async (req, res) => {
    try {
        // Get noteid from the request params 
        let noteid = req.params.id;
        // Find whether the note exist with the given id
        let note = await NotesModel.findById(noteid);
        // If note do not exist return unauthorised
        if (!note) {
            return res.status(404).json({success:false,message:"Not found any notes."});
        }
        // Check whether the note is belong to the specified user or not 
        if (req.user.id !== note.user.toString()) {
            // If not owner of the note return unauthorised error
            return res.status(401).json({success:false,message:"Not allowed to Update."});
        }
        // Gather the info and creating a updated note for updation
        let newnote = {};
        const { title, description, tag } = req.body;
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }
        // Find and update the note with the new details provided
        let updatednote = await NotesModel.findByIdAndUpdate(noteid, { $set: newnote }, { new: true })
        res.json({success:true,updatednote});
    } catch (error) {
        console.log("Internal server error occurred");
        console.log(error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}
export const deleteNote=async (req, res) => {
    try {
        // Get noteid from the request params 
        let noteid = req.params.id;
        // Find whether the note exist with the given id
        let note = await NotesModel.findById(noteid);
        // If note do not exist return unauthorised
        if (!note) {
            return res.status(404).json({success:false,message:"Not found any notes."});
        }
        // Check whether the note is belong to the specified user or not 
        if (req.user.id !== note.user.toString()) {
            // If not owner of the note return unauthorised error
            return res.status(401).json({success:false,message:"Not allowed to delete."});
        }
        // Find and delete the note 
        const result = await NotesModel.findByIdAndDelete(noteid);
        // console.log(result);
        res.json({ success: true,message: `Deleted the note:"${result.title}" successfully.` });
    } catch (error) {
        console.log("Internal server error occurred");
        console.log(error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}