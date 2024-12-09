const express = require('express');
const JobPosting = require('../models/JobPosting');

// Creat router
const router = express.Router();

/**
 * @description Create a new job posting
 * @route POST /JobPostings
 * @body {title, company, date, location, type, term, duration, format, modality, language, description}
 * @response 201 {title, company, date, location, type, term, duration, format, modality, language, description}
 * @response 400 {error: "All fields are required" / "Job posting already exists"}
 */
router.post('/', async (req, res) => {
  try {
    const {
      title,
      company,
      date,
      location,
      type,
      term,
      duration,
      format,
      modality,
      language,
      description,
    } = req.body;

    // Basic validation to ensure all required fields are provided
    if (!title || !company || !date || !location || !location.country || !location.province || !location.city || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if an event with the same title, company, date, and location already exists
    const existingPosting = await Event.findOne({ 
      title,
      company,
      "location.country": location.country,
      "location.province": location.province,
      "location.city": location.city,
      date, 
     });

    if (existingPosting) {
      return res.status(400).json({ error: "Job posting already exists" });
    }

    const job = new JobPosting({
      title,
      company,
      date,
      location,
      type,
      term,
      duration,
      format,
      modality,
      language,
      description,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Get all job postings
 * @route GET /JobPostings
 * @response 200 [{title, company, date, location, type, term, duration, format, modality, language, description}]
 * @response 400 {error: "Error fetching job postings"}
 */
router.get("/", async (req, res) => {
  try {
    const event = await Event.find();
    res.json(event);
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
});

/**
 * @description Get all job postings by any field (Except description)
 * @route GET /JobPostings?title=Title&company=Company&date=yyyy-dd-mm&country=Country&province=Province&city=City&type=Type... (Too long otherwise)
 * @param {string} title - Job title (optional)
 * @param {string} company - Job company (optional)
 * @param {string} date - Job posting date (optional)
 * @param {string} country - Job country (optional)
 * @param {string} province - Job province (optional)
 * @param {string} city - Job city (optional)
 * @param {string} type - Job type (optional)
 * @param {string} term - Job starting term (optional)
 * @param {string} duration - Job contract duration (optional)
 * @param {string} format - Job work format (optional)
 * @param {string} modality - Job time commitment (optional)
 * @param {string} language - Job language (optional)
 * @response 200 [{title, company, date, location, type, term, duration, format, modality, language, description}]
 * @response 404 {error: "Job not found"}
 * @response 400 {error: "Error fetching job postings" / "Invalid date format"}
 */
router.get('/', async (req, res) => {
  try {
    const { title, company, date, country, province, city, type, term, modality, language, format } = req.query;

    // Build the query object based on available query parameters
    const query = {};

    if (title) query.title = title;
    if (company) query.title = company;
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
    if (type) query['type.status'] = type;
    if (term) query['term.status'] = term;
    if (modality) query['modality.status'] = modality;
    if (language) query['language.status'] = language;
    if (format) query['format.status'] = format;

    // Search for events based on the dynamic query object
    const jobs = await JobPosting.find(query); 

    if (jobs.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Get a specific job posting by id
 * @route GET /JobPostings/:id
 * @param {string} id - Job posting id
 * @response 200 {title, company, date, location, type, term, duration, format, modality, language, description}
 * @response 404 {error: "Job posting not found"}
 * @response 400 {error: "Error fetching job posting"}
 */
router.get('/:id', async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job posting not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Update a specific job posting by id
 * @route PUT /JobPostings/:id
 * @param {string} id - Job posting id
 * @body {title, company, date, location, type, term, duration, format, modality, language, description}
 * @response 200 {title, company, date, location, type, term, duration, format, modality, language, description}
 * @response 404 {error: "Job posting not found"}
 * @response 400 {error: "All fields are required" / "Error fetching job posting"}
 */
router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      company,
      date,
      location,
      type,
      term,
      duration,
      format,
      modality,
      language,
      description,
    } = req.body;

    // Ensure all required fields are provided for update
    if (!title || !company || !date || !location || !location.country || !location.province || !location.city || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const job = await JobPosting.findByIdAndUpdate(
      req.params.id,
      {
        title,
        company,
        date,
        location,
        type,
        term,
        duration,
        format,
        modality,
        language,
        description,
      },
      { new: true } // Return the updated document
    );

    if (!job) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Delete a specific job posting by id
 * @route DELETE /JobPostings/:id
 * @param {string} id - Job posting id
 * @reponse 404 {error: "Job posting not found"}
 * @response 400 {"Error fetching job posting"}
 */
router.delete('/:id', async (req, res) => {
  try {
    const job = await JobPosting.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    res.json({ message: 'Job posting deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
