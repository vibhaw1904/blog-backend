const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const Token=require('../models/token');

//@desc register users
//@route POst/api/users
//@access public
const registerUser = expressAsyncHandler(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        res.status(400).json({ message: 'Please add all fields' });
        return;
      }
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token:generateToken(user._id)
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.error(error);
    }
  });
  

//@desc Login users
//@route POST/api/users/login
//@access public
const loginUser = expressAsyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Convert password to string if it's not already
      // const plainTextPassword =  String(password);
  
      // Check for user email
      const user = await User.findOne({ email });
  
      if (user) {
        // Check if password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (isPasswordValid) {
          res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token:generateToken(user._id)
          });
        } else {
          res.status(400).json({ message: 'Invalid credentials' });
        }
      } else {
        res.status(400).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.error(error);
    }
  });

  const logout=expressAsyncHandler(async(req,res)=>{
    const  token=req.body.token;
    await Token.deleteOne({token:token}); 
    res.status(200).json({message:"logout successfull"})
  })
  

//@desc Get users
//@route GET/api/users/me
//@access public
const getMe = expressAsyncHandler(async (req, res) => {
  const{_id,username,email}=await User.findById(req.user.id)
  res.status(200).json({
    id:_id,
    username,
    email
  })
});
const generateToken=(id)=>{
  return jwt.sign({id},process.env.JWT,{
    expiresIn:'30d'
  })
}

module.exports = { registerUser, loginUser, getMe,logout };
