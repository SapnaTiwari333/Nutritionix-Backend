const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorhandler");

const dotenv = require("dotenv").config();

//connect to the database
connectDb();

//initialize the app
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// User routes
app.use("/api/users",require("./routes/userRoutes"));

// Error handler middleware
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});