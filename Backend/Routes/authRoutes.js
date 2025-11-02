const express = require('express');
const authRoutes = express.Router();
const User = require('../model/User');
const validator = require('validator');
const bcrypt = require('bcrypt');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


authRoutes.post('/user/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userData = await User.findOne({ email });
        if (userData) {
            throw new Error('Email already exists');
        }
        if (name.length < 5) {
            throw new Error('Invalid name (must be at least 5 characters)');
        }
        if (!validator.isEmail(email)) {
            throw new Error('Invalid email address');
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error('Please enter a stronger password');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user',
        });
        await newUser.save();
        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

authRoutes.post('/instructor/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userData = await User.findOne({ email });
        if (userData) {
            throw new Error('Email already exists');
        }
        if (name.length < 5) {
            throw new Error('Invalid name (must be at least 5 characters)');
        }
        if (!validator.isEmail(email)) {
            throw new Error('Invalid email address');
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error('Please enter a stronger password');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'instructor',
        });
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

authRoutes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!userData) {
            res.clearCookie('token');
            throw new Error("please register first");
        }
        const passwordValid = await bcrypt.compare(password, userData.password);
        if (!passwordValid) {
            throw new Error("Invalid password");
        }
        const token = jwt.sign({ id: userData._id }, JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true
        });
        res.status(200).send("successfuly login");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

authRoutes.post('/logout', async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
        });
        res.status(200).send("Successfully logged out")
    } catch (error) {
        res.status(400).send(error.message);
    }
})

authRoutes.get('/user', auth, async (req, res) => {
    try {
        const userData = req.user;
        res.status(200).send(userData);
    } catch (error) {
        res.status(400).send(error.message);
    }

})


module.exports = authRoutes;
