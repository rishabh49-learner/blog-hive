const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const swaggerDocs = require("./swagger");
const serverless = require("serverless-http");

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

// Error Handling Middleware
app.use(errorHandler);

// Export for Vercel Serverless Functions
module.exports = app;
module.exports.handler = serverless(app);

// Start server (only in local dev)
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    swaggerDocs(app, port);
    console.log(`Server running on port ${port}`);
  });
}
