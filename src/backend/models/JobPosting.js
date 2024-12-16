const { mongoose } = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  title: { type: String, required: true },       
  company: { type: String, required: true },      
  date: { type: Date, required: true },           
  location: {                                     
    country: { type: String, required: true },    
    province: { type: String, required: true },
    city: { type: String, required: true },
  },
  type: [{                                        
    status: { type: String, enum: [
        'job',
        'internship', 
        'volunteer'
      ], default: 'job' },
  }],
  term: [{                                        
    status: { type: String, enum: [
        'winter', 
        'spring', 
        'summer', 
        'fall'], 
      default: 'summer' },
  }],
  duration: [{                                    
    status: { type: String, enum: [
        '4-months', 
        '6-month', 
        '8-month', 
        '12-month'
      ], default: '4-month' },
  }],
  format: [{                                      
    status: { type: String, enum: [
        'hybrid', 
        'remote', 
        'online'
      ], default: 'remote' },
  }],
  modality: [{                                    
    status: { type: String, enum: [
        'full-time', 
        'part-time', 
        'contract'
      ], default: 'full-time' },
  }],
  language: [{                                    
    status: { type: String, enum: [
        'english', 
        'french'
      ], default: 'english' },
  }], 
  description: { type: String, required: true }, 
});

module.exports = mongoose.model('JobPosting', jobPostingSchema, "JobPostings");
