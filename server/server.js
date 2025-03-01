const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const swaggerDocs = require("./swagger");

const port = process.env.PORT || 5500;

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/blogs", require("./routes/blogsRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/upload", require("./routes/imageRoutes"));

// Serve frontend (for full-stack deployment)
const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

app.use(errorHandler);

module.exports = app;
