const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./UserModel");

// Registration
router.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const user = await User.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Add Tasks
router.post("/addtodo/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    user.tasks.push(req.body);
    user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update task to InProgress
router.post("/inprogress/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.tasks = user.tasks.filter((task) => task.id === req.body.id);
    req.body.status = "In Progress";
    user.tasks.push(req.body);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update task to Done
router.post("/done/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.tasks = user.tasks.filter((task) => task.id === req.body.id);
    req.body.status = "Done";
    user.tasks.push(req.body);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get all tasks
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User Not Found");
    }
    res.status(200).send(user.tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a task
router.post("/updatetask/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User Not Found");
    }
    user.tasks = user.tasks.filter((task) => task.id === req.body.id);
    user.tasks.push(req.body);
    await user.save();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete Task
router.delete("/deletetask/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.tasks = user.tasks.filter((task) => task.id !== req.body.id);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
