const express = require('express');
const UserRoutes = express.Router();
const validator = require('validator');
const User = require('../model/User');
const bcrypt = require('bcrypt');

UserRoutes.post('/signup', async (req, res) => {
    try {
        const { name, email, password, image } = req.body;
        const userDetails = await User.findOne({ email })
        if (username.length < 4) {
            throw new Error("name size must be 5")
        }
        if (userDetails) {
            throw new Error("Email is already Exists");
        }
        else if (!validator.isEmail(email)) {
            throw new Error("Invalid Email")
        }
        else if (!validator.isStrongPassword(password)) {
            throw new Error("please Enter Strong password");
        }
        else {
            const bycrptPasswod = await bcrypt.hash(password, 10);
            const createData = new User({
                username,
                email,
                password: bycrptPasswod,
                image
            });
            await createData.save();
            res.status(200).send(createData);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})
UserRoutes.post('/login',async(req,res)=>{
   try{
    const {username,email,password} = req.body;
    const userData = await User.findOne({email});

    if(!userData){
        res.send("please register first");
    }else if(bcrypt.compare(password,userData.password)){
        
    }

   }catch(error){

   }
})
module.exports = UserRoutes;