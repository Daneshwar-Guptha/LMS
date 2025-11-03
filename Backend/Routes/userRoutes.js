const express = require('express');
const auth = require('../middleware/auth');
const Course = require('../model/Course');
const userRoutes = express.Router();

userRoutes.get('/courses', auth, async (req, res) => {

    try {
        const courses = await Course.find({});
        res.send(courses);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

userRoutes.get('/courses/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).send("Invalid course ID");
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRoutes.post('/courses/:id/enroll',auth,async(req,res)=>{
    try{
        const {id} = req.body;
       

    }catch(error){

    }
})


module.exports = userRoutes;