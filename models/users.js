require("dotenv").config();
const mongoose=require("mongoose");
// const config=require("config");
const secret=process.env.SECRET;
const encrypt=require("mongoose-encryption");


const UserSchema=new mongoose.Schema({
    email:String,
    password:String
});

UserSchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});

const User=new mongoose.model("User",UserSchema);

module.exports=User;