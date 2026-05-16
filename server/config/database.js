const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_CONNECTION)
    .then((data)=>{console.log('Database Connection Successfully');});

}

module.exports = connectDatabase;