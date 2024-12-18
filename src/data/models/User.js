//Shushi, Thomas

const { mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: { type: String, default: "FirstNamePlaceholder"},                
  lname: { type: String, default: "LastNamePlaceholder"},                 
  email: { type: String, required: true, unique: true },                  
  id: { type: String, unique: true, default: () => `ID${Date.now()}`},    
  password: { type: String, required: true, unique: true },               
  faculty: { type: String, default: "FacultyPlaceholder"},                
  documents: [{                                                           
      id: { type: String, required: true, unique: true },                 
      document: { type: String, required: true },                         
      date: { type: Date, required: true },                               
      category: { type: String, enum: [                                   
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
    status: { type: String, enum: [                                       
        "None",           
        "Pending",        
        "In Progress",    
        "Approved",       
        "Rejected"        
      ], default: "None" },
    star: { type: Boolean, required: true, default: false }               // Boolean for if Job is starred or not
  }],
});

module.exports = mongoose.model('User', userSchema, "Users");
