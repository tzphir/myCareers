const express = require('express');
const mongoose = require("mongoose");
const UserModel = require("../models/User");
const bcrypt = require('bcrypt');
const JobPostingModel = require('../models/JobPosting');
const EventModel = require('../models/Event');

const router = express.Router();

// Get User by ID
router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    UserModel.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// User login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "No record exists" });
            }

            // Compare hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Internal server error" });
                }

                if (isMatch) {
                    res.status(200).json({ message: "Success", id:user._id });
                } else {
                    res.status(401).json({ message: "Password is wrong" });
                }
            });
        })
        .catch(err => {
            console.error('Error during login:', err);
            res.status(500).json({ message: "Internal server error" });
        });
});

// User signin
router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    UserModel.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            // Hash the password before storing it in the database
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return res.status(500).json({ message: "Internal server error" });
                }

                // Create the new user with the hashed password
                UserModel.create({ email, password: hashedPassword, id:'' })
                    .then(newUser => {
                        res.status(201).json({ message: "User created successfully", user: newUser });
                    })
                    .catch(err => {
                        console.error('Error during user creation:', err);
                        res.status(500).json({ message: "Error creating user" });
                    });
            });
        })
        .catch(err => {
            console.error('Error during signin:', err);
            res.status(500).json({ message: "Internal server error" });
        });
});



router.post('/:userId/JobPostings', async (req, res) => {
    const { userId } = req.params;
    const { jobId, status } = req.body;

    try {
        console.log(userId, jobId, status)
        // Find the user
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the job posting
        const jobPosting = await JobPostingModel.findById(jobId);
        if (!jobPosting) {
            return res.status(404).json({ message: 'Job posting not found' });
        }

        // Check if the job posting is already added
        const alreadyExists = user.jobPostings.some(
            (job) => job.jobPostingId.toString() === jobId
        );

        if (alreadyExists) {
            return res.status(400).json({ message: 'Job posting already added to user' });
        }

        // Add the job posting to the user
        user.jobPostings.push({ jobPostingId: jobId, status: status || 'In Progress' });
        await user.save();

        res.status(200).json({ message: 'Job posting added successfully', jobPostings: user.jobPostings });
    } catch (error) {
        console.error('Error adding job posting to user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Add an event to a user
router.post('/:userId/Events', async (req, res) => {
    const { userId } = req.params;
    const { eventId } = req.body;

    try {
        // Find the user
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the event
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the event is already added
        const alreadyExists = user.events.some(
            (evt) => evt.eventId.toString() === eventId
        );

        if (alreadyExists) {
            return res.status(400).json({ message: 'Event already added to user' });
        }

        // Add the event to the user
        user.events.push({ eventId });
        await user.save();

        res.status(200).json({ message: 'Event added successfully', events: user.events });
    } catch (error) {
        console.error('Error adding event to user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
