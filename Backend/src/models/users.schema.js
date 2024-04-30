const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
 username:{
  type:String,
 
 },
 email:{
  type:String,
  required:true
 },
 password:{
  type:String,
  required:true
 },
 list:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:'List'
 }]
})

module.exports=mongoose.model('User',userSchema);