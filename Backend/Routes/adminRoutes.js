const express = require('express');
const {adminAuth} = require('../middleware/auth');
const User = require('../model/User');
const AdminRoutes = express.Router();


AdminRoutes.get('/dashboard',adminAuth,async(req,res)=>{
   try{
     const userData =  await User.find({'role':"user"});
    res.send(userData)
   }catch(error){
    res.status(400).send(error.message);
   }

})

module.exports =AdminRoutes