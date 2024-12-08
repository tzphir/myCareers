const { mongoose } = require('mongoose');
const { Event } = require('./Event');
const { JobPosting } = require('./JobPosting');

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },                          // First name
  lname: { type: String, required: true },                          // Last name
  email: { type: String, required: true, unique: true },            // School email
  id: { type: String, required: true, unique: true },               // Student id
  password: { type: String, required: true, unique: true },         // Account password
  faculty: { type: String, required: true },                        // Student faculty
  documents: [{                                                     // Professional documents (CV, cover letters, transcripts)
      id: { type: String, required: true },                         // Document name
      date: { type: Date, required: true },                         // Creation/modification date
  }],
  events: [{                                                        // Registered events
      id: { type: String, required: true },                         // Event name
      event: { type: Event, required: true, unique: true },         // Event object
  }],
  jobPostings: [{                                                   // Job Posting applications
      id: { type: String, required: true , unique: true },          // Job posting name
      posting: { type: JobPosting, required: true, unique: true },  // Job posting object
      status: { type: String, enum: [                               // Job posting status
          'Pending',        // Waiting for news 
          'In Progress',    // In interview process
          'Approved',       // Received offer
          'Rejected'        // Received rejection
        ], default: 'In Progress' },
  }],
});

module.exports = mongoose.model('User', userSchema, "Users");