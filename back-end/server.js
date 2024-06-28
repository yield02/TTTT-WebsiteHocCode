const app = require("./src/app");
const port = 3000;
const db = require("./src/connection/database.connection");

async function startServer() {
  try {
    await db.connect();
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
