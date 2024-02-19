import mongoose from "mongoose";
const Userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
})
const UserModel=mongoose.model("user",Userschema);

export default UserModel;