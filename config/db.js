const mongoose=require("mongoose");
const config=require("config");
const URI=config.get("mongoURI");

const connectDB=async function(){

    try{

        await mongoose.connect(URI);
        console.log("mongoDB is connected successfully ");

    }catch{
        (e)=>{
            console.log(e);
        }
    }
};

module.exports=connectDB;