const { mongoose } = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },       
  date: { type: Date, required: true },        
  location: {                                 
    country: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
  },
  category: { type: String },                   
  description: { type: String },                
});

module.exports = mongoose.model("Event", eventSchema, "Events");
