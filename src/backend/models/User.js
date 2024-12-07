const { Schema } = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  id: { type: String, unique: true },
  password: { type: String, required: true},
  faculty: String,
  documents: [
    {
      id: { type: String, required: true},
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

// Mongoose automatically looks up the non capitalized, plural form of the collection
const UserModel = new (mongoose.model("User", UserSchema);
module.exports = UserModel;
