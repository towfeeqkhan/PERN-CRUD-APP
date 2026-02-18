import pool from "../config/db.js";

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
