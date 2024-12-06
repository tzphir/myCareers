const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Create a new event
router.post('/', async (req, res) => {
  try {
    const { name, date, location, category, description } = req.body;

    // Basic validation to ensure all required fields are provided
    if (!name || !date || !location || !location.country || !location.province || !location.city) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const event = new Event({
      name,
      date,
      location,
      category,
      description,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an existing event by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, date, location, category, description } = req.body;

    // Ensure all required fields are provided for update
    if (!name || !date || !location || !location.country || !location.province || !location.city) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { name, date, location, category, description },
      { new: true } // Return the updated document
    );

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an event by ID
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;