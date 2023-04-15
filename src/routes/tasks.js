const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const taskController = require("../controllers/tasks");

router.get("/", auth, taskController.getAllTasks);

router.get("/:id", auth, taskController.getTaskId);

router.post("/", [auth, admin], taskController.createTask);

router.put("/:id", [auth, admin], taskController.updateTask);

router.delete("/:id", [auth, admin], taskController.deleteTask);

module.exports = router;
