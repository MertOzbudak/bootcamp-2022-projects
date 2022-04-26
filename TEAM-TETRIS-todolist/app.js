const express = require("express");

const rootRouter = require("./routes/index");
const todosRouter = require("./routes/todos");

const app = express();

app.use(express.json());

app.use("/", rootRouter);
app.use("/todos", todosRouter);

const listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
