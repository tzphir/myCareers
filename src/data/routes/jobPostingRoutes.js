const express = require('express');
const JobPosting = require('../models/JobPosting');
const router = express.Router();

// Create a new job posting
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

// Get all job postings
router.get('/', async (req, res) => {
  try {
    const { type, term, modality, language, format } = req.query;

    const query = {};
    if (type) query['type.status'] = type;
    if (term) query['term.status'] = term;
    if (modality) query['modality.status'] = modality;
    if (language) query['language.status'] = language;
    if (format) query['format.status'] = format;

    const jobs = await JobPosting.find(query); 
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific job posting by ID
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

// Update an existing job posting by ID
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

// Delete a job posting by ID
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