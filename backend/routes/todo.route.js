import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
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

export default router;
