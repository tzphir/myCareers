const mongoose = require('mongoose'); // Importing Schema constructor from mongoose

const UserSchema = new mongoose.Schema({

  // mcgill id
  id: {type: String, required: false},
  
  name: { type: String, required: false },
  
  // Email is required and must be unique across all users
  email: { 
    type: String, 
    required: true,
    unique: true,
  },


  // Password is required during sign-in
  password: { 
    type: String, 
    required: true, 
  },

  // Faculty field is optional; it can be filled later
  faculty: { 
    type: String, 
    required: false, 
  },

  // Documents: Array of documents that the user can upload; each document has a required 'id'
  documents: [
    {
      id: { 
        type: String, 
        required: true, // Each document needs an 'id'
      },
    },
  ],

  // Events: Array of events the user is associated with, each event has an 'id' and a 'status'
  events: [
    {
      _id: { 
        type: String, 
        required: true, // Each event needs an 'id'
      },
      status: { 
        type: String, 
        enum: ['hidden', 'starred', 'none'], 
        default: 'none', 
      },
    },
  ],

  // Job Postings: Similar to events, the user can have job postings with an 'id' and 'status'
  jobPostings: [
    {
      _id: { 
        type: String, 
        required: true, // Each job posting needs an 'id'
      },
      status: { 
        type: String, 
        enum: ['hidden', 'starred', 'none'], // Valid status options for the job posting
        default: 'none', // Default status is 'none'
      },
    },
  ],
});

// Create the model based on the schema and automatically look up the non-capitalized, plural form of the collection name
const UserModel = mongoose.model("User", UserSchema);

// Export the model for use in other parts of the application
module.exports = UserModel;
