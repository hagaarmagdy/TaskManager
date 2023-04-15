const { Task } = require("../models/task");
const schemas = require("../validators/schemas");


const getTaskId = async (req, res) => {
  const { error } = schemas.taskSchema.validate();
  if (error) return res.status(400).send(error.details[0].message);
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(400).send("Incorrect task id.");
  res.send(task);
};

const getAllTasks = async (req, res) => {
  const { error } = schemas.taskSchema.validate();
  if (error) return res.status(400).send(error.details[0].message);
  const task = await Task.find();
  if (!task) return res.status(400).send("No tasks found.");
  res.send(task);
};

const createTask = async (req, res) => {
  const { error } = schemas.taskSchema.validate();
  if (error) return res.status(400).send(error.details[0].message);
  const task = await new Task(req.body).save();
  res.send(task);
};

const updateTask = async (req, res) => {
  const { error } = schemas.taskSchema.validate();
  if (error) return res.status(400).send(error.details[0].message);
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(400).send("Task not found.");
  res.send(task);
};

const deleteTask = async (req, res) => {
  const { error } = schemas.taskSchema.validate();
  if (error) return res.status(400).send(error.details[0].message);
  const task = await Task.findByIdAndRemove(req.params.id);
  if (!task) return res.status(400).send("Task not found.");
  res.send(task);
};

module.exports = {
  getTaskId,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
