import pool from "../config/db.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    res.json(todos.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);

    if (todo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [description],
    );
    res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodo.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todos SET description = $1, completed = $2 WHERE id = $3 RETURNING *",
      [description, completed, id],
    );

    if (updatedTodo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({
      message: "Todo updated successfully",
      todo: updatedTodo.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const toggleTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *",
      [id],
    );

    if (todo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({
      message: "Todo status toggled successfully",
      todo: todo.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query("DELETE FROM todos WHERE id = $1", [
      id,
    ]);

    if (deletedTodo.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
