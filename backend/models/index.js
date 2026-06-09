const mongoose = require('mongoose');

// Project Schema
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: [String],
    link: String,
    github: String,
    image: String,
});

// Contact Message Schema
const ContactMessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Experience Schema
const ExperienceSchema = new mongoose.Schema({
    role: String,
    organization: String,
    duration: String,
    description: String,
});

module.exports = {
    Project: mongoose.model('Project', ProjectSchema),
    ContactMessage: mongoose.model('ContactMessage', ContactMessageSchema),
    Experience: mongoose.model('Experience', ExperienceSchema),
};
