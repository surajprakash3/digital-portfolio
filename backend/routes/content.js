const express = require('express');
const router = express.Router();
const { Project, Experience } = require('../models');

// @route   GET api/content
// @desc    Get all portfolio content
router.get('/', async (req, res) => {
    try {
        // In a real app, these would come from the database.
        // For now, we'll return a structured object that the frontend can consume.
        // You can later add data to MongoDB and fetch it here.

        const skills = [
            { name: 'Python', level: '90%' },
            { name: 'JavaScript', level: '85%' },
            { name: 'Cloud Computing', level: '80%' },
            { name: 'Docker', level: '75%' },
            { name: 'Kubernetes', level: '70%' },
            { name: 'AWS', level: '75%' }
        ];

        const projects = await Project.find() || [
            { title: 'Project Alpha', desc: 'Secure cloud-native application with microservices.', tech: ['AWS', 'K8s'] },
            { title: 'Neural Flow', desc: 'Real-time data processing engine using Python.', tech: ['Python', 'Docker'] }
        ];

        const experiences = await Experience.find() || [
            { role: 'Aspiring Developer', org: 'LPU', date: '2022 - Present' },
            { role: 'Umang Leader', org: 'NSS', date: '2023 - 2024' }
        ];

        res.json({
            skills,
            projects,
            experiences
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
