const express = require('express');
// require('dotenv').config();
const router = express.Router();
const connectDb = require('../db/connectdb');
const User = require("../models/User");
const { body, validationResult, matchedData } = require('express-validator');
const bcrypt=require("bcryptjs");
const JWT_SECRET=process.env.JWT_SECRET;
const JWT=require("jsonwebtoken");
const getuserdetails = require('../middleware/getuserdetails');

router.use((req, res, next) => {
    next();
})

// Check whether there exist user if not create one with provided details --No Login required
router.post("/createuser",
    [   
        body('name').trim().notEmpty().isLength({ min: 5 }).escape(),
        body("email").trim().notEmpty().isEmail().escape(),
        body("password").notEmpty().isLength({ min: 8 , max:15 }).escape()
    ], 
    async (req, res) => {
        // Verifying the validations and sanitizers
        let errors=validationResult(req);
        // console.log(req.body);
        let success=false;
        if(!errors.isEmpty()){
            return res.status(400).send(errors);
        }
        // Validations are satisfied and collecting the matched data
        const data=matchedData(req);
        try {
            await connectDb();
            // Retrieve a user, if exist with provided email
            let user=await User.findOne({"email":data.email});
            if(user)
            {
                return res.status(400).send({success,message:"User Already exists with this email. Please Login"});
            }
            // Hashing the password
            const securedPassword=await bcrypt.hash(data.password,bcrypt.genSaltSync(10))
            // Creating a new user
            let newuser=await User.create({
                name: data.name,
                email: data.email,
                password: securedPassword
            })
            // Creating a payload for signing the Json web token 
            const payload={
                user:{
                    id:newuser.id
                }
            }
            // Signing the Json web token
            const authtoken=JWT.sign(payload,JWT_SECRET);
            success=true;
            res.status(200).send({success,authtoken,message:"Account Created Successfully."});
        } catch (error) {
            console.log("Internal server error occurred");
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    
    }
)


// Check whether the user can be logged in or not --No Login required
router.post("/login",
    [
        body("email","Please enter a valid email").trim().notEmpty().isEmail().escape(),
        body("password").notEmpty().isLength({ min: 8 , max:12 }).escape()
    ],
    async (req, res) => {
        // Verifying the validations and sanitizers
        let errors=validationResult(req);
        let success=false;
        if(!errors.isEmpty()){
            return res.status(400).send(errors);
        }
        // Validations are satisfied and collecting the matched data
        const data=matchedData(req);
        try {
            await connectDb();

            // Check whether the user exist with the provided email
            let user=await User.findOne({"email":data.email});
            if(!user)
            {
                return res.status(400).json({success,message:"Please enter vaild credentials."});
            }

            // Check if the password for the user matches
            let isPasswordMatched= bcrypt.compare(data.password,user.password);
            if(!isPasswordMatched){
                return res.status(401).json({success,message:"Please enter vaild credentials."});
            }
             // Creating a payload for signing the Json web token 
            const payload={
                user:{
                    id:user.id
                }
            }
            // Signing the Json web token
            const authtoken=JWT.sign(payload,JWT_SECRET);
            success=true;
            res.status(200).send({success,authtoken,message:"Logged in successfully"});
        } catch (error) {
            console.log("Internal server error occurred");
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)

// Get the logged in user details from the database
router.post("/getuser",getuserdetails,async(req,res)=>{
    // Getting the user id from the middleware i.e. getuserdetails.js
    let userid=req.user.id;
    await connectDb();
    let user=await User.findById(userid).select("-password");
    res.json(user)
})
module.exports = router