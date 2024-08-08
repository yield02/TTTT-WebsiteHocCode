const authRouter = require("./auth");
const courseRouter = require("./course");
const chapterRouter = require("./chapter");
const lessonRouter = require("./lesson");
const subjectRouter = require("./subject");
const userRouter = require("./user");
const discussRouter = require("./discuss");
const oAuthRouter = require("./oauth");
function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/chapter", chapterRouter);
  app.use("/api/lesson", lessonRouter);
  app.use("/api/subject", subjectRouter);
  app.use("/api/user", userRouter);
  app.use("/api/discuss", discussRouter);
  app.use("/api/oauth", oAuthRouter);
}
module.exports = route;
