const Rating = require("../../models/Rating");
const Course = require("../../models/Course");
const ApiError = require("../../utils/apiError");

exports.createRating = async (data, course_id, author_id) => {
  try {
    if (!data.star && !course_id && !author_id) {
      throw new ApiError(400, "Thông tin yêu cầu không đầy đủ");
    }
    const course = await Course.findById(course_id);
    if (!course) {
      throw new ApiError(404, "Không tìm thấy khóa học");
    }
    if (!course.enroll.includes(author_id)) {
      throw new ApiError(400, "Bạn chưa tham gia khóa học này");
    }
    const rating = await Rating.findOne({ course_id, author_id });
    if (rating) {
      throw new ApiError(400, "Bạn đã đánh giá khóa học này");
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
    throw new ApiError(error.statusCode, error.message);
  }
};

exports.getRatingOfCourse = async function (course_id) {
  try {
    const ratings = await Rating.find({ course_id }).populate({
      path: "author_id",
      model: "User",
      select: "username avatar fullname",
    });
    return ratings;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
