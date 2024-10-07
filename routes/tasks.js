// Require the existing Express
const express = require("express");
// Create a Local Router
const router = express.Router();

// Require Tasks Controller
const tasksController = require("../controllers/tasks_controller");  // Ensure the path is correct

// Access the Tasks Controller's createTask() Function by '/create' route
router.post("/create", tasksController.createTask);  // Ensure createTask is defined in the controller

// Access the Tasks Controller's deleteTask() Function by '/delete' route
router.get("/delete", tasksController.deleteTask);   // Ensure deleteTask is defined

// Access the Tasks Controller's deleteCompletedTasks() Function by '/delete/completed' route
router.get("/delete/completed", tasksController.deleteCompletedTasks);

// Access the Tasks Controller's completeTask() Function by '/complete' route
router.get("/complete", tasksController.completeTask);  // Ensure completeTask is defined

// Access the Tasks Controller's completeAllTasks() Function by '/complete/all' route
router.get("/complete/all", tasksController.completeAllTasks);  // Ensure completeAllTasks is defined

// Export the Router
module.exports = router;
