const mongoose= require("mongoose");
const connect=mongoose.connect("mongodb://0.0.0.0:27017/College");


//check database connected or not
/*
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb://localhost:27017/College`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

*/

connect.then(()=>{
    console.log("database connected successfully");
})
.catch((error)=>{
    console.log("Not connected to database");
    console.error(error.message);
});

// Create a Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Collection Part

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;
