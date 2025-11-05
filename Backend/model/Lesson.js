const { Schema, model, default: mongoose } = require("mongoose");
const Course = require("./Course");

const lessonSchema = new Schema(
  {
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
);

// Validate course & set order
lessonSchema.pre("save", async function (next) {
  const Course = mongoose.model("Course");
  const courseExists = await Course.exists({ _id: this.courseId });
  if (!courseExists) return next(new Error("Course not found for this lesson"));

  if (this.isNew && (!this.order || this.order === 0)) {
    const Lesson = mongoose.model("Lesson");
    const lastLesson = await Lesson.findOne({ courseId: this.courseId })
      .sort("-order")
      .lean();
    this.order = lastLesson ? lastLesson.order + 1 : 1;
  }
  next();
});

// Reorder lessons efficiently
lessonSchema.statics.reorderLessons = async function (courseId) {
  const lessons = await this.find({ courseId }).sort("order");
  const bulkOps = lessons.map((lesson, i) => ({
    updateOne: {
      filter: { _id: lesson._id },
      update: { $set: { order: i + 1 } },
    },
  }));
  if (bulkOps.length) await this.bulkWrite(bulkOps);
  return lessons;
};

// Update course after lesson deletion
lessonSchema.post("findOneAndDelete", async function (doc) {
  if (doc && doc.courseId) {
    const Lesson = mongoose.model("Lesson");
    await Course.findByIdAndUpdate(doc.courseId, {
      $pull: { lessons: doc._id },
      $inc: { totalLessons: -1 },
    });
    await Lesson.reorderLessons(doc.courseId);
  }
});

lessonSchema.index({ courseId: 1, order: 1 });

module.exports = model("Lesson", lessonSchema);
