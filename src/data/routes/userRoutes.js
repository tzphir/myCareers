const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a user's documents
router.put('/:id/documents', async (req, res) => {
  try {
    const { documents } = req.body; // Expect an array of documents
    if (!documents || !Array.isArray(documents)) {
      return res.status(400).json({ error: 'Documents must be an array' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { documents },
      { new: true } // Return updated user
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update the status of an event for a user
router.put('/:id/events/:eventId', async (req, res) => {
  try {
    const { status } = req.body; // Expect 'hidden', 'starred', or 'none'
    if (!['hidden', 'starred', 'none'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.params.id, 'events.id': req.params.eventId },
      { $set: { 'events.$.status': status } },
      { new: true } // Return updated user
    );

    if (!user) {
      return res.status(404).json({ error: 'User or event not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update the status of a job posting for a user
router.put('/:id/jobPostings/:jobPostingId', async (req, res) => {
  try {
    const { status } = req.body; // Expect 'hidden', 'starred', or 'none'
    if (!['hidden', 'starred', 'none'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.params.id, 'jobPostings.id': req.params.jobPostingId },
      { $set: { 'jobPostings.$.status': status } },
      { new: true } // Return updated user
    );

    if (!user) {
      return res.status(404).json({ error: 'User or job posting not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a document to a user's list of documents
router.post('/:id/documents', async (req, res) => {
  try {
    const { documentId } = req.body; // Expect a document ID
    if (!documentId) {
      return res.status(400).json({ error: 'Document ID is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { documents: { id: documentId } } },
      { new: true } // Return updated user
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add an event to a user's list of events
router.post('/:id/events', async (req, res) => {
  try {
    const { eventId, status } = req.body; // Expect eventId and status ('hidden', 'starred', 'none')
    if (!eventId || !['hidden', 'starred', 'none'].includes(status)) {
      return res.status(400).json({ error: 'Invalid event or status' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { events: { id: eventId, status } } },
      { new: true } // Return updated user
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a job posting to a user's list of job postings
router.post('/:id/jobPostings', async (req, res) => {
  try {
    const { jobPostingId, status } = req.body; // Expect jobPostingId and status ('hidden', 'starred', 'none')
    if (!jobPostingId || !['hidden', 'starred', 'none'].includes(status)) {
      return res.status(400).json({ error: 'Invalid job posting or status' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { jobPostings: { id: jobPostingId, status } } },
      { new: true } // Return updated user
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a document from a user's list of documents
router.delete('/:id/documents/:documentId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { documents: { id: req.params.documentId } } },
      { new: true } // Return updated user
    );

    if (!user) {
      return res.status(404).json({ error: 'User or document not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an event from a user's list of events
router.delete('/:id/events/:eventId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { events: { id: req.params.eventId } } },
      { new: true } // Return updated user
    );

    if (!user) {
      return res.status(404).json({ error: 'User or event not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a job posting from a user's list of job postings
router.delete('/:id/jobPostings/:jobPostingId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { jobPostings: { id: req.params.jobPostingId } } },
      { new: true } // Return updated user
    );

    if (!user) {
      return res.status(404).json({ error: 'User or job posting not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;