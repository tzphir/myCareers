const { mongoose } = require('mongoose');
const { Event } = require('./Event');
const { JobPosting } = require('./JobPosting');

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },                          // First name
  lname: { type: String, required: true },                          // Last name
  email: { type: String, required: true, unique: true },            // School email
  id: { type: String, required: true, unique: true },               // Student id
  password: { type: String, required: true },                       // Account password
  faculty: { type: String, required: true },                        // Student faculty
  documents: [{                                                     // Professional documents (CV, cover letters, transcripts)
      id: { type: String, required: true },                         // Document name
      date: { type: Date, required: true },                         // Creation/modification date
  }],
  events: [{                                                        // Registered event IDs
      eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // Reference to Event by ID
  }],
  jobPostings: [{                                                   // Job Posting applications (by ID)
      jobPostingId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },  // Reference to JobPosting by ID
      status: { type: String, enum: [                               // Job posting status
          'Pending',        // Waiting for news 
          'In Progress',    // In interview process
          'Approved',       // Received offer
          'Rejected'        // Received rejection
        ], default: 'In Progress' },
  }],
});

module.exports = mongoose.model('User', userSchema, "Users");
