const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorhandler");
const cors=require("cors");

const dotenv = require("dotenv").config();

//connect to the database
connectDb();

//initialize the app
const app = express();

const PORT = process.env.PORT || 3000;

// Enable CORS for all routes (important for Flutter app)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Serve static files from uploads directory (optional)
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// User routes
app.use("/api/users",require("./routes/userRoutes"));

//Images analysis routes
app.use("api/images",require("./routes/imageRoutes"));

// Error handler middleware
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});