const authRouter = require("./auth");
const userRouter = require("./user");
const oAuthRouter = require("./oauth");
const reportRouter = require("./report");

const courseRouter = require("./study/course");
const chapterRouter = require("./study/chapter");
const lessonRouter = require("./study/lesson");
const subjectRouter = require("./study/subject");
const discussRouter = require("./study/discuss");
const replyDiscussRouter = require("./study/reply-discuss");
const ratingRouter = require("./study/rating");
const learningRouter = require("./study/learning");
const questionRouter = require("./study/question");
const exerciseRouter = require("./study/exercise");

const topicRouter = require("./forum/topic");
const postRouter = require("./forum/post");
const commentRouter = require("./forum/comment");
const hashtagRouter = require("./forum/hashtag");

const commentManagerRouter = require("../routes/manager/comment-manager.route");
const courseManagerRouter = require("../routes/manager/course-manager.route");
const postManagerRouter = require("../routes/manager/post-manager.route");
const reportManagerRouter = require("../routes/manager/report-manager.route");
const userManagerRouter = require("../routes/manager/user-manager.route");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/chapter", chapterRouter);
  app.use("/api/lesson", lessonRouter);
  app.use("/api/subject", subjectRouter);
  app.use("/api/user", userRouter);
  app.use("/api/report", reportRouter);
  app.use("/api/discuss", discussRouter);
  app.use("/api/oauth", oAuthRouter);
  app.use("/api/reply-discuss", replyDiscussRouter);
  app.use("/api/rating", ratingRouter);
  app.use("/api/learning", learningRouter);
  app.use("/api/topic", topicRouter);
  app.use("/api/post", postRouter);
  app.use("/api/comment", commentRouter);
  app.use("/api/hashtag", hashtagRouter);
  app.use("/api/question", questionRouter);
  app.use("/api/exercise", exerciseRouter);
  app.use("/api/manager/comment", commentManagerRouter);
  app.use("/api/manager/course", courseManagerRouter);
  app.use("/api/manager/post", postManagerRouter);
  app.use("/api/manager/report", reportManagerRouter);
  app.use("/api/manager/user", userManagerRouter);
}
module.exports = route;
