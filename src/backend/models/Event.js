const { Schema } = require('mongoose');

const EventSchema = new mongoose.Schema({
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

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;
