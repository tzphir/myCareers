const express = require('express');
const Event = require('../models/Event');

// Create router
const router = express.Router();

/**
 * @description Create a new event
 * @route POST /Events
 * @body {name, date, location, category, description}
 * @response 201 {id, name, date, location, category, description}
 * @response 400 {error: "All fields are required" / "Event already exists"}
 */
router.post("/", async (req, res) => {
  try {
    const { name, date, location, category, description } = req.body;

    // Basic validation to ensure all required fields are provided
    if (!name || !date || !location || !location.country || !location.province || !location.city) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if an event with the same name, date, and location already exists
    const existingEvent = await Event.findOne({ 
      name,
      date,
      "location.country": location.country,
      "location.province": location.province,
      "location.city": location.city
     });

    if (existingEvent) {
      return res.status(400).json({ error: "Event already exists" });
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

/**
 * @description Get all events
 * @route GET /Events
 * @response 200 [{id, name, date, location, category, description}]
 * @response 400 {error: "Error fetching events"}
 */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Get event by any field (Except description)
 * @route GET /Events?name=Name&date=yyyy-dd-mm&country=Country&province=Province&city=City&category=Category
 * @param {string} name - Event Name (optional)
 * @param {string} date - Event Date (optional)
 * @param {string} country - Event Country (optional)
 * @param {string} province - Event Province (optional)
 * @param {string} city - Event City (optional)
 * @param {string} category - Event Category (optional)
 * @response 200 {id, name, date, location, category, description}
 * @response 404 {error: "Event not found"}
 * @response 400 {error: "Error fetching event" / "Invalid date format"}
 */
router.get("/", async (req, res) => {
  try {
    const { name, date, country, province, city, category } = req.query;

    // Build the query object based on available query parameters
    const query = {};

    if (name) query.name = name;
    if (date) {
      const parsedDate = new Date(date);

      if (isNaN(parsedDate)) {
        return res.status(400).json({ error: "Invalid date format" });
      }

      query.date = parsedDate;
    }
    if (country) query["location.country"] = country;
    if (province) query["location.province"] = province;
    if (city) query["location.city"] = city;
    if (category) query.category = category;

    // Search for events based on the dynamic query object
    const events = await Event.find(query);

    if (events.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Get a specific event by id
 * @route GET /Events/:id
 * @param {string} id - Event id
 * @response 200 {id, name, date, location, category, description}
 * @response 404 {error: "Event not found"}
 * @response 400 {error: "Error fetching event"}
 */
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Update a specific event by id
 * @route PUT /Events/:id
 * @param {string} id - Event id
 * @body {name, date, location, category, description}
 * @response 200 {id, name, date, location, category, description}
 * @response 404 {error: "Event not found"}
 * @response 400 {error: "All fields are required" / "Error fetching event"}
 */
router.put("/:id", async (req, res) => {
  try {
    const { name, date, location, category, description } = req.body;

    // Ensure all required fields are provided for update
    if (!name || !date || !location || !location.country || !location.province || !location.city) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { name, date, location, category, description },
      { new: true } // Return the updated document
    );

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Delete a specific event by id
 * @route DELETE /Events/:id
 * @param {string} id - Event id
 * @reponse 404 {error: "Event not found"}
 * @response 400 {"Error fetching event"}
 */
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;