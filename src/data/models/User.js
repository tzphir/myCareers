const { Schema } = require('mongoose');
const { usersDB } = require('../config/database');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  faculty: { type: String, required: true },
  documents: [
    {
      id: { type: String, required: true },
    },
  ],
  events: [
    {
      id: { type: String, required: true },
      status: { type: String, enum: ['hidden', 'starred', 'none'], default: 'none' },
    },
  ],
  jobPostings: [
    {
      id: { type: String, required: true },
      status: { type: String, enum: ['hidden', 'starred', 'none'], default: 'none' },
    },
  ],
});

module.exports = usersDB.model('User', userSchema);