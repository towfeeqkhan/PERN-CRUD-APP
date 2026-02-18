import express from "express";
import { createTodo, getAllTodos } from "../controllers/todo.controller.js";

const router = express.Router();

// Get all todos
router.get("/", getAllTodos);

// Add new todo
router.post("/", createTodo);

export default router;
