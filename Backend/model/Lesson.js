const {Schema,model, default: mongoose} = require('mongoose');
const Course = require('./Course');

const LessonSchema = new Schema({

  courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Lesson title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    contentUrl: {
      type: String,
      trim: true,
      default: "",
    },
    duration: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
    
)