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
      required: [true, "Instructor is required"],
    },
    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
    },
    thumbnail: {
      type: String, // URL or image link
      default: "",
    },
    category: {
      type: String,
      enum: ["development", "design", "marketing", "other"],
      default: "other",
    },
    lessons: [
      {
        title: { type: String, required: true },
        content: { type: String }, 
        duration: { type: Number, default: 0 }, 
      },
    ],
    totalLessons: {
      type: Number,
      default: 0, 
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Course", courseSchema);
