const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongouri = process.env.mongouri;

const connectmongo = async () => {
  try {
    await mongoose.connect(mongouri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log (error.message );
  }
};

module.exports=connectmongo;