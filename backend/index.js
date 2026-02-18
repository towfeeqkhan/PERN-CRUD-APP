import express from "express";
import todoRoutes from "./routes/todo.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is live!");
});

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
