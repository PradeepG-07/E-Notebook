
require('dotenv').config();
const mongoose =require('mongoose');
const URI=process.env.MONGO_URI;
const connectDb= ()=>{
   mongoose.connect(URI);
}
module.exports=connectDb;