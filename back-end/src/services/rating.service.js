const Rating = require("../models/Rating");
const Course = require("../models/Course");
const ApiError = require("../utils/apiError");

exports.createRating = async (data, course_id, author_id) => {
  try {
    if (!data.star && !course_id && !author_id) {
      throw new ApiError("Thông tin yêu cầu không đầy đủ", 400);
    }
    const course = await Course.findById(course_id);
    if (!course) {
      throw new ApiError("Không tìm thấy khóa học", 404);
    }
    if (!course.enroll.includes(author_id)) {
      throw new ApiError("Bạn chưa tham gia khóa học này", 400);
    }
    const rating = await Rating.findOne({ course_id, author_id });
    if (rating) {
      throw new ApiError("Bạn đã đánh giá khóa học này", 400);
    }

    const newRating = new Rating({
      star: data.star,
      description: data.description,
      course_id,
      author_id,
    });
    await newRating.save();

    course.rating.push(newRating._id);
    await course.save();
    return newRating;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message);
  }
};

exports.getRatingOfCourse = async function (course_id) {
  try {
    const ratings = await Rating.find({ course_id });
    return ratings;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
