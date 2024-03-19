import {validationResult,matchedData} from "express-validator";
import UserModel from "../models/User.js";
import  * as bcrypt from "bcrypt";
import  jsonwebtoken from "jsonwebtoken";
// or import this as
// import {default as JWT} from "jsonwebtoken";

const JWT=jsonwebtoken;
const JWT_SECRET=process.env.JWT_SECRET;


export const signup= async (req, res) => {
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
        // Retrieve a user, if exist with provided email
        const user=await UserModel.findOne({"email":data.email});
        if(user)
        {
            const exists=true;
            return res.status(400).send({exists,success,message:"User Already exists with this email. Please Login"});
        }
        // Hashing the password
        const securedPassword=await bcrypt.hash(data.password,bcrypt.genSaltSync(10))
        // Creating a new user
        const newuser=await UserModel.create({
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

export const login= async (req, res) => {
    // Verifying the validations and sanitizers
    const errors=validationResult(req);
    let success=false;
    if(!errors.isEmpty()){
        return res.status(400).send(errors);
    }
    // Validations are satisfied and collecting the matched data
    const data=matchedData(req);
    try {

        // Check whether the user exist with the provided email
        const user=await UserModel.findOne({"email":data.email});
        if(!user)
        {
            return res.status(400).json({success,message:"Please enter vaild credentials."});
        }

        // Check if the password for the user matches
        const isPasswordMatched= await bcrypt.compare(data.password,user.password);
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
        const authtoken= JWT.sign(payload,JWT_SECRET);
        success=true;
        res.status(200).send({success,authtoken,message:"Logged in successfully"});
    } catch (error) {
        console.log("Internal server error occurred");
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}

export const getUserDetails=async(req,res)=>{
    // Getting the user id from the middleware i.e. getuserdetails.js
    let userid=req.user.id;
    const user=await UserModel.findById(userid).select("-password");
    res.status(200).json(user);
}