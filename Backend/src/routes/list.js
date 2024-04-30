const express = require('express')
const User = require('../models/users.schema.js');
const List = require('../models/list.schema.js');
const Router = express.Router();

// addtodo
Router.post("/addtask",async(req,res)=>{
try {
  const {email,body,title}=req.body;
const existingUser=await User.findOne({email});
if(existingUser){
  const list=new List({title,body,user:existingUser});
  await list.save().then(()=>res.status(200).json({list}));
  existingUser.list.push(list);
  existingUser.save();
}} catch (error) {
  console.log(error);
}})

 //updatetodo

 Router.put("/updatetask/:id",async(req,res)=>{
  try {
    const {email,body,title}=req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
      const list= await List.findByIdAndUpdate(req.params.id,{body,title});
    list.save().then(()=>{res.status(200).json({message:"task updated successfully"})});
    }
    else{
     console.log("please login first");
    }
  } catch (error) {
    console.log(error);
  }
 })
  
 // delete
 Router.delete("/deletetask/:id",async(req,res)=>{
  try {
    const {email}=req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
      await List.findByIdAndDelete(req.params.id).then(()=>{
        res.status(200).json({message:"task deleted successfully"});
      })
      
    }
  } catch (error) {
    console.log("error: " + error);
  }
 })

module.exports = Router;
