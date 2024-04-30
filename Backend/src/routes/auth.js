const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users.schema');

const Router = express.Router();

// Sign up route
Router.post('/register', async (req, res) => {

  try {
    const {email,username,password}=req.body;
    const hashPassword = await bcrypt.hash(password,10);
    const user = new User({email,username,password:hashPassword});
    await user.save();
    res.status(200).json({user});

  } catch (error) {
    res.status(500).json({ message:'error creating user' ,error});
  }
  
});

// login
Router.post('/login', async (req, res) => {
  try {
    const user=await User.findOne({email:req.body.email});
    if(!user) {
      res.status(404).json({ message: 'user dont exist' });
    }
    const isMatch = await bcrypt.compareSync(req.body.password, user.password);
    if(!isMatch) {
      res.status(404).json({ message: 'password signup first' });
    }
    const {password,...others}=user._doc;
    res.status(200).json({others});
  } catch (error) {
    res.status(500).json({ message: 'user dont exist', error });
  }
});

module.exports = Router;
