const { mongoose } = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  title: { type: String, required: true },        // Job title
  company: { type: String, required: true },      // Company name
  date: { type: Date, required: true },           // Posting date
  location: {                                     // Job location
    country: { type: String, required: true },    
    province: { type: String, required: true },
    city: { type: String, required: true },
  },
  type: [{                                        // Job type
    status: { type: String, enum: [
        'job',
        'internship', 
        'volunteer'
      ], default: 'job' },
  }],
  term: [{                                        // Job starting term
    status: { type: String, enum: [
        'winter', 
        'spring', 
        'summer', 
        'fall'], 
      default: 'summer' },
  }],
  duration: [{                                    // Contract duration
    status: { type: String, enum: [
        '4-months', 
        '6-month', 
        '8-month', 
        '12-month'
      ], default: '4-month' },
  }],
  format: [{                                      // Working format
    status: { type: String, enum: [
        'hybrid', 
        'remote', 
        'online'
      ], default: 'remote' },
  }],
  modality: [{                                    // Job time commitment
    status: { type: String, enum: [
        'full-time', 
        'part-time', 
        'contract'
      ], default: 'full-time' },
  }],
  language: [{                                    // Language spoken in office
    status: { type: String, enum: [
        'english', 
        'french'
      ], default: 'english' },
  }], 
  description: { type: String, required: true },  // Job description
});

module.exports = mongoose.model('JobPosting', jobPostingSchema, "JobPostings");