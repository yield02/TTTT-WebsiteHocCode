const topicService = require("../../services/forum/topic.service");
const jwt = require("jsonwebtoken");
const ApiError = require("../../utils/apiError");

exports.createTopic = async (req, res, next) => {
  try {
    // const token = req.cookies.token;
    // var userInfor = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const topic = await topicService.createTopic(req.body);
    res.status(201).json(topic);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
