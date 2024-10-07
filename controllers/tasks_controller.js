// Require the Task Model Data Structure
const Task = require("../models/task");

// Exporting createTask() Function
module.exports.createTask = (req, res) => {
    try {
        let dateObj = new Date(req.body.date);
        let today = new Date();
        
        // Reset time part of today's date to 00:00:00 for comparison
        today.setHours(0, 0, 0, 0);

        // Check if the entered date is before today
        if (dateObj < today) {
            return res.status(400).send("Task date must be today or a future date.");
        }

        let day = dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate();
        let month = dateObj.toLocaleString("default", { month: "short" });
        let year = dateObj.getFullYear().toString().slice(-2);

        Task.create(
            {
                task: req.body.task,
                description: req.body.description,
                priority: req.body.priority,
                category: req.body.category,
                date: `${month} ${day}, ${year}`,
            },
            (err, newTask) => {
                if (err) {
                    console.error("Error in creating a task:", err);
                    return res.status(500).send("Server error while creating task");
                }
                return res.redirect(req.get("Referer") || "/");
            }
        );
    } catch (err) {
        console.error("Error during task creation:", err);
        return res.status(500).send("Unexpected server error while creating task");
    }
};

// Exporting deleteTask() Function
module.exports.deleteTask = (req, res) => {
    let id = req.query.id;  

    if (!id) {
        return res.status(400).send("Task ID not provided");
    }

    Task.findByIdAndDelete(id, (err) => {
        if (err) {
            console.error("Error in deleting task:", err);
            return res.status(500).send("Error deleting task");
        }
        return res.redirect(req.get("Referer") || "/");
    });
};

// Exporting completeTask() Function
module.exports.completeTask = (req, res) => {
    let id = req.query.id;  
    let completed = req.query.completed === "true" ? false : true;  

    if (!id) {
        return res.status(400).send("Task ID not provided");
    }

    Task.findByIdAndUpdate(id, { completed: completed }, (err) => {
        if (err) {
            console.error("Error in updating task completion status:", err);
            return res.status(500).send("Error updating task");
        }
        return res.redirect(req.get("Referer") || "/");
    });
};

// Exporting deleteCompletedTasks() Function
module.exports.deleteCompletedTasks = (req, res) => {
    Task.deleteMany({ completed: true }, (err) => {
        if (err) {
            console.error("Error in deleting completed tasks:", err);
            return res.status(500).send("Error deleting completed tasks");
        }
        return res.redirect(req.get("Referer") || "/");
    });
};

// Export the completeAllTasks() Function
module.exports.completeAllTasks = (req, res) => {
    Task.updateMany({ completed: false }, { completed: true }, (err) => {
        if (err) {
            console.error("Error in marking all tasks as complete:", err);
            return res.status(500).send("Error updating tasks");
        }
        return res.redirect(req.get("Referer") || "/");
    });
};
