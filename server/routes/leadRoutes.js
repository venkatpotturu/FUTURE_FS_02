const router = require("express").Router();
const Lead = require("../models/Lead");

router.post("/add", async (req,res)=>{
    try {
        const { name, email, source } = req.body;
        if (!name || !email || !source) {
            return res.status(400).json({ success: false, message: "Name, email, and source are required." });
        }
        const lead = new Lead(req.body);
        await lead.save();
        res.status(201).json({ success: true, message: "Lead Added Successfully", data: lead });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error for unique fields
            return res.status(400).json({ success: false, message: "A lead with this email already exists." });
        }
        res.status(500).json({ success: false, message: "Failed to add lead", error: error.message });
    }
});

router.get("/", async (req,res)=>{
    try {
        const leads = await Lead.find();
        res.status(200).json({ success: true, data: leads });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch leads", error: error.message });
    }
});

router.put("/:id", async (req,res)=>{
    try {
        const { id } = req.params;
        const updatedLead = await Lead.findByIdAndUpdate(id, req.body, { returnDocument: 'after', runValidators: true });
        
        if (!updatedLead) {
            return res.status(404).json({ success: false, message: "Lead not found." });
        }
        
        res.status(200).json({ success: true, message: "Lead Updated Successfully", data: updatedLead });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: "Invalid Lead ID." });
        }
        if (error.code === 11000) { // Duplicate key error for unique fields
            return res.status(400).json({ success: false, message: "A lead with this email already exists." });
        }
        res.status(500).json({ success: false, message: "Failed to update lead", error: error.message });
    }
});

module.exports = router;