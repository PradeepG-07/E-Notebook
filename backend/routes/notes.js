const express = require('express');
require('dotenv').config();
const router = express.Router();
const connectDb = require('../db/connectdb');
const Notes = require("../models/Notes");
const getuserdetails = require('../middleware/getuserdetails');
const { body, validationResult } = require('express-validator');

// Retrieve Notes of the user --Login Required
router.get("/fetchallnotes", getuserdetails, async (req, res) => {
    try {
        await connectDb();
        let notes = await Notes.find({ user: req.user.id });
        res.json({ notes });
    } catch (error) {
        console.log("Internal server error occurred");
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Add new notes to the database --Login Required
router.post("/addnotes", getuserdetails,
    [
        body('title', "Title cannot be empty").trim().notEmpty().isLength({min:5, max:30}),
        body('description', "Description cannot be empty").trim().notEmpty().isLength({min:5})
    ],
    async (req, res) => {
        await connectDb();
        let { title, description, tag } = req.body;
        // Verifying the validations and sanitizers
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }
        try {
            let notes = await Notes.create({
                user: req.user.id,
                title: title,
                description: description,
                tag: tag
            })
            res.send(notes);
        } catch (error) {
            console.log("Internal server error occurred");
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// Update the notes of the user
router.put("/updatenotes/:id", getuserdetails,
    [
        body('title', "Title cannot be empty").trim().notEmpty().isLength({min:5, max:30}),
        body('description', "Description cannot be empty").trim().notEmpty().isLength({min:5})
    ],
    async (req, res) => {
        try {
            await connectDb();
            // Get noteid from the request params 
            let noteid = req.params.id;
            // Find whether the note exist with the given id
            let note = await Notes.findById(noteid);
            // If note do not exist return unauthorised
            if (!note) {
                return res.status(404).send("Not found any notes.")
            }
            // Check whether the note is belong to the specified user or not 
            if (req.user.id !== note.user.toString()) {
                // If not owner of the note return unauthorised error
                return res.status(401).send("Not allowed.")
            }
            // Gather the info and creating a updated note for updation
            let newnote = {};
            let { title, description, tag } = req.body;
            if (title) { newnote.title = title }
            if (description) { newnote.description = description }
            if (tag) { newnote.tag = tag }
            // Find and update the note with the new details provided
            let updatednote = await Notes.findByIdAndUpdate(noteid, { $set: newnote }, { new: true })
            res.json(updatednote);
        } catch (error) {
            console.log("Internal server error occurred");
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
// Delete the note  --Login Required
router.delete("/deletenotes/:id", getuserdetails, async (req, res) => {
    try {
        await connectDb();
        // Get noteid from the request params 
        let noteid = req.params.id;
        // Find whether the note exist with the given id
        let note = await Notes.findById(noteid);
        // If note do not exist return unauthorised
        if (!note) {
            return res.status(404).send("Not found any notes.")
        }
        // Check whether the note is belong to the specified user or not 
        if (req.user.id !== note.user.toString()) {
            // If not owner of the note return unauthorised error
            return res.status(401).send("Not allowed.")
        }
        // Find and delete the note 
        let result = await Notes.findByIdAndDelete(noteid);
        console.log(result);
        res.json({ "sucess": `Deleted the note:"${result.title}" successfully.` });
    } catch (error) {
        console.log("Internal server error occurred");
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;