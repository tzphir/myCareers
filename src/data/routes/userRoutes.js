const express = require('express');
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const JobPosting = require('../models/JobPosting');
const Event = require('../models/Event');
const fs = require("fs");
const path = require("path");
const upload = require('../utils/upload');

const router = express.Router();

// Get User by ID
router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// User login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "No record exists" });
            }

            // Compare hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Internal server error" });
                }

                if (isMatch) {
                    res.status(200).json({ message: "Success", id:user._id });
                } else {
                    res.status(401).json({ message: "Password is wrong" });
                }
            });
        })
        .catch(err => {
            console.error('Error during login:', err);
            res.status(500).json({ message: "Internal server error" });
        });
});

// User signin
router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    User.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            // Hash the password before storing it in the database
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return res.status(500).json({ message: "Internal server error" });
                }

                // Create the new user with the hashed password
                User.create({ email, password: hashedPassword, id:'' })
                    .then(newUser => {
                        res.status(201).json({ message: "User created successfully", user: newUser });
                    })
                    .catch(err => {
                        console.error('Error during user creation:', err);
                        res.status(500).json({ message: "Error creating user" });
                    });
            });
        })
        .catch(err => {
            console.error('Error during signin:', err);
            res.status(500).json({ message: "Internal server error" });
        });
});


/**
 * @description Add a job posting to a user's list of job postings
 * @route POST /Users/:id/jobPostings
 * @param {string} id - User ID
 * @body {string} jobPostingId - The ID of the job posting to add
 * @body {string} status - Status of the job posting ("None", "Pending", "In Progress", "Approved", "Rejected")
 * @body {string} star - Star status of job posting (true, false)
 * @response 201 {Array} - Updated list of user's job postings
 * @response 404 {error: "User not found" / "Job posting not found"}
 * @response 400 {error: "Invalid job posting ID or status" / "Star status must be a boolean" / "Job posting is already in the user"s list" / "Error adding job posting"}
 */
router.post("/:id/jobPostings", async (req, res) => {
    try {
      const { jobPostingId, status, star } = req.body;
      
      const starred = req.body.star === 'true' ? true : req.body.star === 'false' ? false : req.body.star;
  
      if (!jobPostingId || !["None", "Pending", "In Progress", "Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid job posting ID or status" });
      }
  
      if (typeof starred !== 'boolean') {
        return res.status(400).json({ error: "Star status must be a boolean" });
      }
  
      const jobPosting = await JobPosting.findById(jobPostingId);
      if (!jobPosting) {
        return res.status(404).json({ error: "Job posting not found" });
      }
  
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (user.jobPostings.some(e => e.jobPostingId.toString() === jobPostingId)) {
        return res.status(400).json({ error: "Job posting is already in the user's list" });
      }
      
      user.jobPostings.push({ jobPostingId, status, star });
      await user.save();
  
      res.status(201).json(user.jobPostings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


// Add an event to a user
router.post('/:userId/Events', async (req, res) => {
    const { userId } = req.params;
    const { eventId } = req.body;

    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the event is already added
        const alreadyExists = user.events.some(
            (evt) => evt.eventId.toString() === eventId
        );

        if (alreadyExists) {
            return res.status(400).json({ message: 'Event already added to user' });
        }

        // Add the event to the user
        user.events.push({ eventId });
        await user.save();

        res.status(200).json({ message: 'Event added successfully', events: user.events });
    } catch (error) {
        console.error('Error adding event to user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});








/**
 * @description Add a document to a user's list of documents
 * @param {string} id - User ID
 * @body {file} document - Document file to be uploaded
 * @body {string} [category] - Optional category for the document ("CV", "Transcript", "Cover Letter")
 * @response 201 {id, fname, lname, email, id, password, faculty, documents, events, jobPostings}
 * @response 400 {error: "No file uploaded" }
 * @response 404 {error: "User not found" }
 * @response 500 {error: "Error processing the file or updating user documents" }
 */
router.post("/:id/documents", upload.single('document'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      const documentId = req.file.filename; // Use the uploaded file's filename as the document ID
      const documentPath = path.join(req.params.id, documentId);
  
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $push: { documents: {
          id: documentId,
          document: documentPath,
          date: new Date(),
          category: req.body.category || null } } },
        { new: true } // Return updated user
      );
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });






  
/**
 * @description Get a specific document from user
 * @route GET /Users/:id/documents/:documentId
 * @param {string} id - User ID
 * @param {string} documentId - Document ID (filename)
 * @response 200 {file} - The requested document file
 * @response 404 {error: "File not found"}
 * @response 500 {error: "Error retrieving the document"}
 */
router.get("/:id/documents/:documentId", (req, res) => {
    try {
      const { id, documentId } = req.params;
  
      const documentPath = path.join(__dirname, "..", "user_data", id, documentId);
  
      if (!fs.existsSync(documentPath)) {
        return res.status(404).json({ error: "File not found" });
      }
  
      res.sendFile(documentPath);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving the document" });
    }
  });



  /**
 * @description Update a specific user by id (document, events and job postings handled separately)
 * @route PUT /Users/:id
 * @param {string} id - User id
 * @body {fname, lname, email, id, password, faculty}
 * @response 200 {id, fname, lname, email, id, password, faculty, documents, events, jobPostings}
 * @response 404 {error: "User not found"}
 * @response 400 {error: "All fields are required" / "Error fetching user"}
 */
router.put("/:id", async (req, res) => {
    try {
      const updateData = req.body;
  
      // Ensure there is something to update
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No fields provided to update" });
      }
  
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updateData }, // Use $set to only update provided fields
        { new: true, runValidators: true } // Return updated document and validate fields
      );
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });
  
  /**
   * @description Update a specific user by id (document, events and job postings handled separately)
   * @route PUT /Users/:id/jobPostings/:jobPostingId
   * @param {string} id - User ID
   * @param {string} jobPostingId - Job posting ID
   * @body {star} - Star status of document (true or false)
   * @response 200 [{JobPostingId, status, star}]
   * @response 404 {error: "User or job posting not found"}
   * @response 400 {error: "Invalid or missing 'star' field" / "Error fetching user"}
   */
  router.put("/:id/jobPostings/:jobPostingId", async (req, res) => {
    try {
      const { id, jobPostingId } = req.params;
      const { star } = req.body
  
      if (star === undefined || typeof star !== 'boolean') {
        return res.status(400).json({ error: "Invalid or missing 'star' field" });
      }
  
      const user = await User.findOneAndUpdate(
        { _id: id, 'jobPostings.jobPostingId': jobPostingId },
        { $set: { 'jobPostings.$.star': star } }, 
        { new: true, runValidators: true } 
      );
  
      if (!user) {
        return res.status(404).json({ error: "User not found" }); 
      }
  
      const updatedJobPosting = user.jobPostings.find(posting => posting.jobPostingId.toString() === jobPostingId);
      return res.status(200).json({
        jobPostingId: updatedJobPosting.jobPostingId,
        status: updatedJobPosting.status,
        star: updatedJobPosting.star
      });
  
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  });




  /**
 * @description Delete a user's document by ID
 * @route DELETE /Users/:id
 * @param {string} id - User ID
 * @param {string} documentId - Document name
 * @response 200 {message: "Document deleted successfully" }
 * @response 404 {error: "User not found" / "Document not found" }
 * @response 400 {error: "Error deleting the user or files" / "Error fetching documents" }
 * @response 500 {error: "Error deleting file" }
 */
router.delete("/:id/documents/:documentId", async (req, res) => {
    try {
      const { id, documentId } = req.params;
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const document = user.documents.find(doc => doc.id === documentId);
  
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
  
      const filePath = path.join(__dirname, "..", "user_data", id, documentId);
  
      user.documents = user.documents.filter(doc => doc.id !== documentId);
  
      await user.save();
  
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ error: "Error deleting file" });
        }
  
        res.json({ message: "Document deleted successfully" });
      });
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  



/**
 * @description Delete a specific job posting for a user
 * @route DELETE /Users/:userId/jobPostings/:jobPostingId
 * @param {string} userId - User ID
 * @param {string} jobPostingId - Job Posting ID
 * @response 200 {message: "Job posting deleted successfully", updatedJobPostings}
 * @response 404 {error: "User not found" / "Job posting not found"}
 * @response 400 {error: "Error deleting job posting"}
 */
router.delete("/:userId/jobPostings/:jobPostingId", async (req, res) => {
    try {
      const { userId, jobPostingId } = req.params;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const postingIndex = user.jobPostings.findIndex((posting) => posting.jobPostingId === jobPostingId);
  
      if (postingIndex === -1) {
        return res.status(404).json({ error: "Job posting not found" });
      }
  
      user.jobPostings.splice(postingIndex, 1); // Remove the job posting from the array
      await user.save();
  
      res.json({ message: "Job posting deleted successfully", updatedJobPostings: user.jobPostings });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });







/**
 * @description Update a specific user's job posting by id (update status and star)
 * @route PUT /Users/:id/jobPostings/:jobPostingId
 * @param {string} id - User ID
 * @param {string} jobPostingId - Job posting ID
 * @body {status, star} - New status and star status of the job posting
 * @response 200 [{jobPostingId, status, star}]
 * @response 404 {error: "User or job posting not found"}
 * @response 400 {error: "Invalid 'status' or 'star' field" / "Error fetching user"}
 */
router.put("/:id/jobPostings/:jobPostingId", async (req, res) => {
  try {
    const { id, jobPostingId } = req.params;
    const { status, star } = req.body;

    // Validate status and star fields
    if (status && !["None", "Pending", "In Progress", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid 'status' field" });
    }
    if (star !== undefined && typeof star !== "boolean") {
      return res.status(400).json({ error: "Invalid 'star' field" });
    }

    const updateFields = {};
    if (status) updateFields['jobPostings.$.status'] = status;
    if (star !== undefined) updateFields['jobPostings.$.star'] = star;

    // Find and update the specific job posting
    const user = await User.findOneAndUpdate(
      { _id: id, "jobPostings.jobPostingId": jobPostingId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User or job posting not found" });
    }
    
    const updatedJobPosting = user.jobPostings.find(posting => posting.jobPostingId.toString() === jobPostingId);
    res.status(200).json({
      jobPostingId: updatedJobPosting.jobPostingId,
      status: updatedJobPosting.status,
      star: updatedJobPosting.star,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
