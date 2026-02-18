import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  toggleTodoStatus,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

// Get all todos
router.get("/", getAllTodos);

// Get a single todo by ID
router.get("/:id", getTodoById);

// Add new todo
router.post("/", createTodo);

// Update todo by ID
router.put("/:id", updateTodo);

// Toggle todo completion status
router.patch("/:id/toggle", toggleTodoStatus);

// Delete a todo by ID
router.delete("/:id", deleteTodo);

export default router;
