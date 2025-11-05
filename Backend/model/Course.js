const { Schema, model, default: mongoose } = require("mongoose");

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: 0,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    totalLessons: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      trim: true,
      default: "General",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes
courseSchema.index({ instructorId: 1 });
courseSchema.index({ title: 1 });

module.exports = model("Course", courseSchema);
