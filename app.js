//jshint esversion:6
require("dotenv").config();
const express =require("express");
const bodyParser=require("body-parser");
const mongoose =require("mongoose");
const encrypt=require("mongoose-encryption");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
const port=process.env.PORT|| 3000;
const connectDB=require("./config/db.js");
const User=require("./models/users.js");
const ejs = require("ejs");


connectDB();


//////////////////////////////////////// not needed ///////////////////////////////////////
// const URI="mongodb://127.0.0.1:27017/User";

// mongoose.connect(URI).then(()=>{
//     console.log("mongodb connection successfull");
// }).catch((e)=>{
//     console.log(e);
// });

///////////////////////////////////////////////////////////////////////////////////////////

app.get("/",function(req,res){
    res.render('home')
})

app.route("/register")

.get(function(req,res){

    res.render("register");
})

.post(async function(req,res){

    const newUser=new User(
        {
            email:req.body.username,
            password:req.body.password
        }
    )

    try{

        await newUser.save();
        console.log("user is registered");
        res.render("secrets.ejs");

    }catch{
        (e)=>{
            console.log(e);
        }
    };

});

app.route("/login")

.get(function(req,res){

    res.render("login");
})

.post(async function(req,res){

    const username=req.body.username;
    const password=req.body.password;

    try{
        const user=await User.findOne({email:username});

        if(!user){

            res.send("invalid user");

        }
        else{
            if(user.password===password){
                res.render("secrets");
            }
            else{
                res.send("invalid pasword");
            }
        };
    }catch{
        (e)=>{
            console.log(e);
            res.redirect("/login");
        };
    };
});

app.get("/logout",function(req,res){
    res.redirect("/");
})

app.route("/submit")

.get(function(req,res){
    res.render("submit");
})

.post(function(req,res){

    const secret=req.body.secret;
    console.log(secret);
    res.render("secrets");

});







app.listen(port,function(){
    console.log('sever is runnig at '+port);
});