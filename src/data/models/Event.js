const { Schema } = require('mongoose');
const { eventsDB } = require('../config/database');

const eventSchema = new Schema({
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

module.exports = eventsDB.model('Event', eventSchema);