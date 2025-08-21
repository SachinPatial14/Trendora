const port = 4000 ;
const express = require("express") ;
const app = express() ;
const mongoose = require("mongoose") ;
const jwt = require("jsonwebtoken");
const multer = require("multer") ;
const path = require("path");
const cors = require("cors") ;

app.use(express.json()) ;
app.use(cors()) ;

mongoose.connect('mongodb://localhost:27017/trendora') ;

app.get("/",(req,res)=>{
    res.send("Express app is runnning")
})

app.listen(port,(err)=>{
    if(!err){
        console.log("server running on port" +port)
    }else{
        console.log("Error :" +err )
    }
})