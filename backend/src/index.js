import mongoose from "mongoose";
import app from "./app.js";
import "dotenv/config";

const PORT=process.env.PORT;
// const auth = require("./routes/auth");
// const notes = require("./routes/notes");
// require('dotenv').config();

// const cors=require('cors');
// app.use(cors())


//  Instead of cors can use this if needed
// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', ['Content-Type','authtoken']);
//   next();
// });


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error);
  })
