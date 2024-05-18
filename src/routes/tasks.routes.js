const express = require("express");
const paginatedResults = require("../utils.js");
const tasks = require("../../DATA.json");
const fs = require("fs");


const router = express.Router();

// Route to create a new task:
router.post("/", (req, res) => {
  const body = req.body;
  if (!body.title || !body.description) {
    return res
      .status(400)
      .json({ status: "Title and Description both Required" });
  }
  tasks.push({ id: tasks.length + 1, ...body });

  fs.writeFile("./DATA.json", JSON.stringify(tasks), (err, data) => {
    return res
      .status(201)
      .json({ status: "Task Created successfully", id: tasks.length });
  });
});

// Route to get all tasks
router.get("/", paginatedResults(tasks), (req, res) => {
  return res.status(200).json(res.paginatedResults);
});

// Route to get Specific task
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (task) {
    return res.status(200).json(task);
  } else {
    return res.status(404).json({ status: "Task not Found" });
  }
});

// Route to update  task by Id
router.put("/:id", (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  if (!body.title || !body.description) {
    return res
      .status(400)
      .json({ status: "Title and Description both Required" });
  }
  if (index >= 0) {
    tasks[index] = { id, ...body };
    fs.writeFile("./DATA.json", JSON.stringify(tasks), (err, data) => {
      if (err) {
        return res.status(500).json({ status: "Error while deleting Task" });
      }
      return res
        .status(200)
        .json({ status: `Task ${id} Updated successfully` });
    });
  } else {
    return res.status(404).json({ status: "Task not Found" });
  }
});

// Route to delete a task by id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  if (index >= 0) {
    tasks.splice(index, 1);
    fs.writeFile("./DATA.json", JSON.stringify(tasks), (err, data) => {
      if (err) {
        return res.status(500).json({ status: "Error while deleting Task" });
      }
      return res
        .status(200)
        .json({ status: `Task-${id} Deleted  Successfully` });
    });
  } else {
    return res.status(404).json({ status: "Task not Found" });
  }
});

module.exports = router;
