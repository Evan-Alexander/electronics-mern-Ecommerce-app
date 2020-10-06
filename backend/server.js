const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

// Routing
const productRoutes = require("./routes/productRoutes");

dotenv.config();

connectDB();

const app = express();

app.use("/api/products", productRoutes);

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
