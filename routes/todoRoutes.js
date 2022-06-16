const express = require("express");
const mongoose = require("mongoose");
const ToDoListModel = require("../models/todoListModel");
const todoRouter = express.Router();

todoRouter.get("/", async function (_, res) {
  try {
    const result = await ToDoListModel.find({});
    return res.json(result);
  } catch (error) {
    console.error("Error: ", error);
    return res.send(error.toString());
  }
});

todoRouter.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    if (!id || id.trim() === "") throw new Error("Invalid ID.");
    const result = await ToDoListModel.findOne({
      _id: mongoose.Types.ObjectId(id),
    });
    return res.json(result);
  } catch (error) {
    console.error("Error: ", error);
    return res.send(error.toString());
  }
});

todoRouter.post("/", async function (req, res) {
  try {
    const { task } = req.body;
    if (!task || task.trim() === "") throw new Error("Invalid task.");
    const result = await ToDoListModel.create({
      task,
      completed: false,
    });
    return res.json(result);
  } catch (error) {
    console.error("error: ", error);
    return res.send(error.toString());
  }
});

todoRouter.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    if (!id || id.trim() === "") throw new Error("Invalid ID.");
    const result = await ToDoListModel.deleteOne({
      _id: mongoose.Types.ObjectId(id),
    });
    return res.json(result);
  } catch (error) {
    console.error("Error: ", error);
    return res.send(error.toString());
  }
});

todoRouter.patch("/task/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { task } = req.body;
    if (!id || id.trim() === "") throw new Error("Invalid ID.");
    if (!task || task.trim() === "") throw new Error("Invalid task.");

    const result = await ToDoListModel.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { task } },
      { new: true }
    );
    return res.json(result);
  } catch (error) {
    console.error("Error:", error);
    return res.send(error.toString());
  }
});

todoRouter.patch("/task-status/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    if (!id || id.trim() === "") throw new Error("Invalid ID.");
    if (!task || task.trim() === "") throw new Error("Invalid task.");

    const result = await ToDoListModel.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { completed } },
      { new: true }
    );
    return res.json(result);
  } catch (error) {
    console.error("Error:", error);
    return res.send(error.toString());
  }
});

module.exports = todoRouter;
