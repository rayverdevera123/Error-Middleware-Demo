const express = require("express");
const app = express();

app.use(express.json());

// ✅ normal route
app.get("/success", (req, res) => {
  res.json({ message: "It works!" });
});

// ❌ error route
app.get("/error", (req, res, next) => {
  next(new Error("Something went wrong!"));
});

// IMPORT error handler
const errorHandler = require("./middleware/errorHandler");

// 404 (not found)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// GLOBAL error handler
app.use(errorHandler);

// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});