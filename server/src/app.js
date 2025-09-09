import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Root route (opsional)
app.get("/", (req, res) => {
  res.send({ message: "Server is running!" });
});

app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
