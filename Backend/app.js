const  express = require('express');
const port=2300;
const app = express();
require("./src/connection/conn.js")
const list =require('./src/routes/list.js');
// xUz5PBmYMAT9QZQ5
const auth = require("./src/routes/auth.js")
app.use(express.json());
// xUz5PBmYMAT9QZQ5
//mongodb+srv://dbUser:xUz5PBmYMAT9QZQ5@cluster0.htv9nbu.mongodb.net/

app.get('/',(req,res)=>{
  res.send('hello world');
});
app.use("/api/v1",auth)
app.use("/api/v1",list)
app.listen(port,(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log(`server is running on port ${port}`);
  }
});