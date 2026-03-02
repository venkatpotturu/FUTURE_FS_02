const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config(); // Load environment variables

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const leadRoutes = require("./routes/leadRoutes");
app.use("/leads", leadRoutes);

// CONNECT MONGODB FIRST
mongoose.connect(process.env.MONGODB_URI) // Use environment variable
.then(()=>{
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000; // Use environment variable or default
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    });

})
.catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process on connection failure
});

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!", error: err.message });
});