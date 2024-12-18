// Shushi

const { mongoose } = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Event name
  date: { type: Date, required: true },         // Event date
  location: {                                   // Event location
    country: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
  },
  category: { type: String },                   // Event category
  description: { type: String },                // Event description
});

module.exports = mongoose.model("Event", eventSchema, "Events");
