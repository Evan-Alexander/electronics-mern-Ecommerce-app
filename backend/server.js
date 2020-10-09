const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

// Routing
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Custom 404 Error
app.use(notFound);

// Custom Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);
