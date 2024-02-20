import {Router} from "express";
import "dotenv/config";
import * as NotesController from "../controllers/notes.js"; 

import AuthenticateUser from "../middleware/verifyuser.js";
import { body } from 'express-validator';

const router = Router();

// Retrieve Notes of the user --Login Required
router.get("/fetchallnotes", AuthenticateUser, NotesController.fetchNotes);


// Add new notes to the database --Login Required
router.post("/addnotes", AuthenticateUser,
    [
        body('title', "Title cannot be empty").trim().notEmpty().isLength({min:5, max:30}),
        body('description', "Description cannot be empty").trim().notEmpty()
    ],
    NotesController.addNote);

// Update the notes of the user
router.put("/updatenotes/:id", AuthenticateUser,
    [
        body('title', "Title cannot be empty").trim().notEmpty().isLength({min:5, max:30}),
        body('description', "Description cannot be empty").trim().notEmpty()
    ],
    NotesController.updateNote);


// Delete the note  --Login Required
router.delete("/deletenotes/:id", AuthenticateUser, NotesController.deleteNote)
export default router;
