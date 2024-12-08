const express = require('express');
const mongoose = require("mongoose");
const UserModel = require("../models/User");

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
