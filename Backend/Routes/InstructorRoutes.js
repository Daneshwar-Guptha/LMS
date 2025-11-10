const express = require('express');
const { instructorAuth } = require('../middleware/auth');
const Course = require('../model/Course');
const InstructorRoutes = express.Router();

InstructorRoutes.get('/view',instructorAuth,async(req,res)=>{
  try{
    const userData = req.user;
    res.status(200).json(userData);

  }catch(error){
    console.log(error)
    res.status(400).json(error.message);
  }

})

InstructorRoutes.post('/course',instructorAuth,async(req,res)=>{
    try{
        const courseData = req.body;
        const userData = req.user;
        const addCourse = await Course.create({
            title:courseData.title,
            description:courseData.description,
            instructorId:userData._id,
            price:courseData.price
        })
    res.status(200).json(addCourse)
    }catch(error){
        console.log(error.message)
        res.status(400).json(error.message);
    }
})

InstructorRoutes.post('/course/lesson',instructorAuth,async(req,res)=>{
    try{
      
        const LessonData = req.body;
        const courseData = await Course.findById({_id:LessonData.id})
        
        res.send(courseData);

    }catch(error){
        res.status(400).send(error.message);
    }

})
module.exports = InstructorRoutes