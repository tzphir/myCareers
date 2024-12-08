const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User.js');

const router = express.Router();

router.post("/", (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    StudentModel.findOne({ email: email })
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

module.exports = router;
