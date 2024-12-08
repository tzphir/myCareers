const { Schema } = require('mongoose');

// Define the schema for job postings
const jobPostingSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true }, 
  date: { type: Date, required: true },  
  location: {
    country: { type: String, required: true },  
    province: { type: String, required: true },  
    city: { type: String, required: true },  
  },
  type: {  // Job type
    type: String,
    enum: ['job', 'internship', 'volunteer'], 
    default: 'job', 
    required: true,
  },
  term: {  // Term of the job
    type: String,
    enum: ['winter', 'spring', 'summer', 'fall'],
    default: 'summer',
    required: true,
  },
  duration: {  // Duration of the job
    type: String,
    enum: ['4-months', '6-month', '8-month', '12-month'],
    default: '4-month',
    required: true,
  },
  format: {  // Job format (hybrid, in-person, online)
    type: String,
    enum: ['hybrid', 'in-person', 'online'],
    default: 'in-person',
    required: true,
  },
  modality: {  // Modality (full-time, part-time, contract)
    type: String,
    enum: ['full-time', 'part-time', 'contract'],
    default: 'full-time',
    required: true,
  },
  language: {  // Language requirement
    type: String,
    enum: ['english', 'french'],
    default: 'english',
    required: true,
  },
  description: { type: String, required: true },  // Job description
});

const JobPostingModel = mongoose.model("JobPosting", JobPostingSchema);
module.exports = JobPostingModel
