const Course = require("../../models/Course");
const Rating = require("../../models/Rating");
const User = require("../../models/User");
const Lesson = require("../../models/Lesson");
const Question = require("../../models/Question");

const apiError = require("../../utils/apiError");
const resize = require("../../utils/resize");
const fs = require("fs");
var mongoose = require("mongoose");

exports.create = async (data, file) => {
  const buffer = file.buffer;

  const resizeBuffer = await resize.resizeCourseImage(buffer);

  var finalImage = {
    contentType: file.mimetype,
    buffer: Buffer.from(resizeBuffer.toString("base64"), "base64"),
  };

  try {
    const newCourse = new Course({
      course_name: data.course_name,
      description: data.description,
      subject_id: data.subject_id,
      author_id: data.author_id,
      image: finalImage,
    });
    return newCourse
      .save()
      .then((res) => {
        return {
          course: {
            ...res._doc,
            image: {
              contentType: file?.mimetype,
              buffer: resizeBuffer.toString("base64"),
            },
          },
        };
      })
      .catch((error) => {
        throw new apiError(500, error.message);
      });
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.update = async (data, file, authorId) => {
  try {
    const courseData = await Course.findOne({
      _id: data._id,
      author_id: authorId,
    });
    if (!courseData) {
      throw new apiError(404, "Course not found");
    }

    courseData.course_name = data.course_name;
    courseData.description = data.description;
    courseData.subject_id = data.subject_id;

    if (file) {
      const buffer = file.buffer;
      var resizeBuffer = await resize.resizeCourseImage(buffer);
      var finalImage = {
        contentType: file?.mimetype,
        buffer: Buffer.from(resizeBuffer.toString("base64"), "base64"),
      };
      courseData.image = finalImage;
    }
    const updatedCourse = await courseData.save();

    if (file) {
      return {
        course: {
          ...updatedCourse._doc,
          image: {
            contentType: file?.mimetype,
            buffer: resizeBuffer.toString("base64"),
          },
        },
      };
    }
    return {
      course: {
        ...updatedCourse._doc,
      },
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.getById = async (courseId) => {
  try {
    const courseData = await Course.findOne({
      _id: courseId,
      "status.state": "active",
    }).populate({
      path: "author_id",
      model: "User",
      select: "username fullname",
    });
    if (!courseData) {
      throw new apiError(404, "Course not found");
    }

    const averageRating = await Rating.aggregate([
      { $match: { course_id: courseData._id } },
      { $group: { _id: null, averageRating: { $avg: "$star" } } },
    ]);

    const totalLesson = await Lesson.countDocuments({
      course_id: courseId,
    });

    const totalQuestion = await Question.countDocuments({
      course_id: courseId,
    });

    return {
      ...courseData._doc,
      totalLesson,
      totalQuestion,
      averageRating: averageRating[0]?.averageRating || 0,
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.getCoursesById = async (coursesId) => {
  try {
    const courses = await Course.find({
      _id: { $in: coursesId.split(",") },
    }).populate({
      path: "author_id",
      model: "User",
      select: "username fullname",
    });

    return courses;
  } catch (error) {
    throw new apiError(error.statusCode, error.message);
  }
};

exports.getByAuthor = async (authorId) => {
  try {
    const courses = await Course.find({ author_id: authorId }).populate({
      path: "author_id",
      model: "User",
      select: "username fullname",
    });

    const result = await Promise.all(
      courses.map(async (course) => {
        const totalLesson = await Lesson.countDocuments({
          course_id: course._id,
        });

        const totalQuestion = await Question.countDocuments({
          course_id: course._id,
        });

        if (course.rating.length <= 0) {
          return {
            ...course._doc,
            totalLesson,
            totalQuestion,
            averageRating: 0,
          };
        }

        const rating = await Rating.aggregate([
          { $match: { course_id: course._id } },
          { $group: { _id: null, averageRating: { $avg: "$star" } } },
        ]);

        return {
          ...course._doc,
          totalLesson,
          totalQuestion,
          averageRating: rating[0].averageRating,
        };
      })
    );

    return {
      courses: result,
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.getBySubjectId = async (subjectIds) => {
  try {
    const courses = await Course.find({
      subject_id: { $in: subjectIds },
      "status.state": "active",
    }).populate({
      path: "author_id",
      model: "User",
      select: "username fullname",
    });

    const result = await Promise.all(
      courses.map(async (course) => {
        const totalLesson = await Lesson.countDocuments({
          course_id: course._id,
        });

        const totalQuestion = await Question.countDocuments({
          course_id: course._id,
        });
        if (course.rating.length <= 0) {
          return {
            ...course._doc,
            totalLesson,
            totalQuestion,
            averageRating: 0,
          };
        }

        const rating = await Rating.aggregate([
          { $match: { course_id: course._id } },
          { $group: { _id: null, averageRating: { $avg: "$star" } } },
        ]);

        return {
          ...course._doc,
          totalLesson,
          totalQuestion,
          averageRating: rating[0].averageRating,
        };
      })
    );

    return {
      courses: result,
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.userEnroll = async (course_id, user_id) => {
  try {
    const course = await Course.findByIdAndUpdate(
      course_id,
      {
        $push: { waiting_enroll: user_id },
      },
      { new: true }
    );
    return course;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.acceptEnroll = async (course_id, users_id, author_id) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: course_id, author_id },
      {
        $pull: { waiting_enroll: { $in: users_id } },
        $push: { enroll: users_id },
      },
      { new: true }
    );

    const updateLearningOfUser = await User.updateMany(
      { _id: { $in: users_id } },
      {
        $push: { learning: course_id },
      }
    );

    return course;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.rejectEnroll = async (course_id, users_id, author_id) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: course_id, author_id },
      {
        $pull: { waiting_enroll: { $in: users_id } },
      },
      { new: true }
    );
    const updateLearningOfUser = await User.updateMany(
      { _id: { $in: users_id } },
      {
        $push: { learning: course_id },
      }
    );
    // Thông báo cho người dùng khi từ chối.
    return course;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};
exports.deleteEnrollFromAuthor = async (course_id, users_id, author_id) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: course_id, author_id },
      {
        $pull: { enroll: { $in: users_id } },
      },
      { new: true }
    );

    const updateLearningOfUser = await User.updateMany(
      { _id: { $in: users_id } },
      {
        $pull: { learning: course_id },
      }
    );
    // Thông báo cho người dùng khi hủy đăng ký.
    return course;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.deleteEnrollFromUser = async (course_id, user_id) => {
  try {
    const course = await Course.findByIdAndUpdate(
      course_id,
      {
        $pull: { enroll: user_id },
      },
      { new: true }
    );
    const updateLearningOfUser = await User.findById(user_id, {
      $pull: { learning: course_id },
    });
    // Thông báo cho người dùng khi hủy đăng ký.
    return course;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.searchCourseWithCourseName = async (course_name) => {
  try {
    const courses = await Course.find(
      {
        course_name: { $regex: course_name, $options: "i" },
        "status.state": "active",
      },
      "course_name image createdAt course_id"
    ).populate({
      path: "author_id",
      select: "username fullname user_id",
    });
    return courses;
  } catch (error) {
    throw new apiError(500, error.message);
  }
};
