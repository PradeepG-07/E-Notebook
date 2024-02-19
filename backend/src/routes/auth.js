import {Router}  from "express";
import { body }  from "express-validator";
import AuthenticatedUser from "../middleware/verifyuser.js";
import * as AuthController from "../controllers/auth.js";

const router = Router();

// Check whether there exist user if not create one with provided details --No Login required
router.post("/signup",
    [   
        body('name').trim().notEmpty().isLength({ min: 5 }).escape(),
        body("email").trim().notEmpty().isEmail().escape(),
        body("password").notEmpty().isLength({ min: 8 , max:15 }).escape()
    ], 
    AuthController.signup
);


// Check whether the user can be logged in or not --No Login required
router.post("/login",
    [
        body("email","Please enter a valid email").trim().notEmpty().isEmail().escape(),
        body("password").notEmpty().isLength({ min: 8 , max:12 }).escape()
    ],
   
    AuthController.login
)

// Get the logged in user details from the database
router.post("/getuser",AuthenticatedUser,AuthController.getUserDetails);

export default router;