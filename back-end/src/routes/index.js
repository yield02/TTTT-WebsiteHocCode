const authRouter = require("./auth");
const courseRouter = require("./course");
const chapterRouter = require("./chapter");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/chapter", chapterRouter);
}
module.exports = route;
