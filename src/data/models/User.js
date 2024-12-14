const { mongoose } = require('mongoose');

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
          "Recommandation Letter",
          "Others"
        ]},
  }],
  events: [{                                                              // Registered events
    eventId: {                                                            // Reference to event by ID
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Event', 
      required: true 
    }, 
  }],
  jobPostings: [{                                                         // Job Posting applications
    jobPostingId: {                                                       // Reference to job posting by ID
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'JobPosting', 
      required: true 
    },
    status: { type: String, enum: [                                       // Job posting status
        "None",           // Didnt apply yet
        "Pending",        // Waiting for news 
        "In Progress",    // In interview process
        "Approved",       // Received offer
        "Rejected"        // Received rejection
      ], default: "None" },
    star: { type: Boolean, required: true, default: false }               // Boolean for if Job is starred or not
  }],
});

module.exports = mongoose.model('User', userSchema, "Users");