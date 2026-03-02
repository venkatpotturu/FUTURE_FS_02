const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required."] },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true, // Ensures email addresses are unique
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] // Basic email regex validation
    },
    source: { type: String, required: [true, "Source is required."] },
    status: { type: String, default: "New" },
    notes: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", LeadSchema);