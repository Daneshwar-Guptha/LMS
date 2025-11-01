const express = require('express');
const UserRoutes = express.Router();
const validator = require('validator');
const User = require('../model/User');

UserRoutes.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userDetails = await User.findOne({ email })
        if (name.length < 4) {
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
            const createData = new User({
                name,
                email,
                password
            });
            await createData.save();
            res.send(createData);
        }


    } catch (error) {
        res.send(error.message);
    }
})
module.exports = UserRoutes;