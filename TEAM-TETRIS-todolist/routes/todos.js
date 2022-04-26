const todoList = require("../db.js");
const express = require("express");
const router = express.Router();

/* GET all todos. */
router.get("/", (req, res, next) => {
  //?isChecked=true
  const { isChecked: check } = req.query;
  const isChecked = check === "true";

  if (check === undefined) {
    return res.json(todoList);
  } else if (isChecked) {
    return res.json(todoList.filter((todo) => todo.isChecked));
  } else {
    return res.json(todoList.filter((todo) => !todo.isChecked));
  }
});

/* CREATE todo */
router.post("/", (req, res, next) => {
  const todo = {
    id: `${"todo-" + new Date().getTime()}`,
    ...req.body
  };
  console.log(req.body);
  todoList.push(todo);
  res.json(todo);
});

/* DELETE todo */
router.delete("/:id", (req, res, next) => {
  const index = todoList.findIndex((item) => item.id === req.params.id);

  if (index < 0) return res.status(404).json("Not found");

  todoList.splice(index, 1);
  res.status(204).json();
});

/* UPDATE todo */
router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  let hasTodo = false;
  if (!id) return res.status(400).json({ message: "Bad Request" });
  console.log(req.body);

  todoList.forEach((todo, i) => {
    if (id === todo.id) {
      todoList[i] = {
        ...todo,
        ...req.body
      };
      hasTodo = true;
      return res.json(todo);
    }
  });
  console.log(todoList);
  if (!hasTodo) return res.status(404).json({ message: "Not Found" });
});

module.exports = router;
