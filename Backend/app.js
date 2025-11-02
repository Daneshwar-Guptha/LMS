const express = require('express');
const app = express();
const DBConnection = require('./config/DBConnection');
const User = require('./model/User');
const Course = require('./model/Course');
const Enrollment = require('./model/Enrollement');
const authRoutes = require('./Routes/authRoutes');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRoutes);

DBConnection()
.then(()=>{
    app.listen(2000,()=>{
    console.log("server was started")
})

})
.catch(error=>{
    console.log(error)
})
