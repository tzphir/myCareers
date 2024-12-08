const express = require('express');
const mongoose = require("mongoose");
const UserModel = require("../models/User");
const bcrypt = require('bcrypt');


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
                UserModel.create({ email, password: hashedPassword })
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

module.exports = router;
