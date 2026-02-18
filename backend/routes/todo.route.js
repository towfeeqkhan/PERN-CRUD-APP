import express from "express";
import { createTodo } from "../controllers/todo.controller.js";

const router = express.Router();

// Add new todo
router.post("/", createTodo);

export default router;
