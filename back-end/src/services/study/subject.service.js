const Subject = require("../../models/Subjects");
const apiError = require("../../utils/apiError");

exports.createSubject = async (data) => {
  try {
    const subject = new Subject({
      title: data.title,
      description: data.description,
    });
    return await subject.save();
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

exports.getAllSubjects = async () => {
  try {
    const subjects = await Subject.find({});
    return { subjects: subjects };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};
