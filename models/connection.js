const mongoose = require('mongoose');
require('dotenv').config();
const DB = process.env.DB;
//SETTING UP MONGOOSE MIDDLEWARE AND ESTABLISHING CONNECTION
const connectDb= async()=>{
    await mongoose.connect(DB,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: true 
    });
    console.log("DB connected !! . . .")

 
}
module.exports = connectDb;