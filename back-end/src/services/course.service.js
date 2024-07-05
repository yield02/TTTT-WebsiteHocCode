const course = require("../models/Course");
const apiError = require("../utils/apiError");
const resize = require("../utils/resize");
const fs = require("fs");

exports.create = async (data, file) => {
  const buffer = file.buffer;

  const resizeBuffer = await resize(buffer);

  var finalImage = {
    contentType: file.mimetype,
    buffer: Buffer.from(resizeBuffer.toString("base64"), "base64"),
  };

  try {
    const newCourse = new course({
      course_name: data.course_name,
      description: data.description,
      author_id: data.author,
      image: finalImage,
    });
    return newCourse
      .save()
      .then((res) => {
        return {
          course: { ...res._doc },
        };
      })
      .catch((error) => {
        throw new apiError(500, error.message);
      });
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.getById = async (courseId) => {
  try {
    const courseData = await course.findById(courseId);
    if (!courseData) {
      throw new apiError(404, "Course not found");
    }
    return {
      course: { ...courseData._doc },
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.update = async (data, file, authorId) => {
  try {
    console.log(data._id, authorId);
    const courseData = await course.findOne({
      _id: data._id,
      author_id: authorId,
    });
    if (!courseData) {
      throw new apiError(404, "Course not found");
    }

    courseData.course_name = data.course_name;
    courseData.description = data.description;

    if (file) {
      const buffer = file.buffer;
      var resizeBuffer = await resize(buffer);
      var finalImage = {
        contentType: file.mimetype,
        buffer: Buffer.from(resizeBuffer.toString("base64"), "base64"),
      };
      courseData.image = finalImage;
    }

    const updatedCourse = await courseData.save();
    return {
      course: {
        ...updatedCourse._doc,
        image: {
          contentType: file.mimetype,
          buffer: resizeBuffer.toString("base64"),
        },
      },
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.getByAuthor = async (authorId) => {
  try {
    console.log(authorId);
    const courses = await course.find({ author_id: authorId });
    return {
      courses: courses.map((course) => {
        return { ...course._doc };
      }),
    };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};
