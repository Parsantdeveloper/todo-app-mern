const mongoose=require('mongoose');
const conn= async()=>{
  try {
    await mongoose
  .connect("mongodb+srv://dbUser:xUz5PBmYMAT9QZQ5@cluster0.htv9nbu.mongodb.net")
  .then(()=>{
    console.log("connected to db")
 
  })
  } catch (error) {
    res.status(404).json({message:"Error connecting to db",error})
  }
}
conn();