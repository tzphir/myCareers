const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../models/User');
const router = express.Router();

mongoose.connect("mongodb://localhost:27017/MyCareersDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    UserModel.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            // Create the new user
            return UserModel.create({ email, password })
                .then(newUser => {
                    res.status(201).json(newUser);
                });
        })
        .catch(err => {
            console.error('Error during signin:', err);
            res.status(500).json({ message: "Internal server error" });
        });
});

module.exports = router;
