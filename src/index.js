const express = require("express");
const app = express();
const PORT = 8080;
const tasksroutes = require("./routes/tasks.routes.js");

app.use(express.json());

app.use("/api/tasks", tasksroutes);

app.listen(PORT, () => {
  console.log(`Server is listning on PORT:${PORT}`);
});
