const { mongoose } = require('mongoose');
const { eventSchema } = require('./Event');
const { jobPostingSchema } = require('./JobPosting');

const userSchema = new mongoose.Schema({
  fname: { type: String, default: "FirstNamePlaceholder"},                // First name
  lname: { type: String, default: "LastNamePlaceholder"},                 // Last name
  email: { type: String, required: true, unique: true },                  // School email
  id: { type: String, unique: true, default: () => `ID${Date.now()}`},    // Student id
  password: { type: String, required: true, unique: true },               // Account password
  faculty: { type: String, default: "FacultyPlaceholder"},                // Student faculty
  documents: [{                                                           // Professional documents (CV, cover letters, transcripts)
      id: { type: String, required: true, unique: true },                 // Document name
      document: { type: String, required: true },                         // Document path
      date: { type: Date, required: true },                               // Creation/modification date
      category: { type: String, enum: [                                   // Document type
          "CV",
          "Transcript", 
          "Cover Letter",
        ]},
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
