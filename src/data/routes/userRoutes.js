const fs = require("fs");
const path = require("path");
const upload = require('../utils/upload'); 
const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const JobPosting = require('../models/JobPosting');

// Create router
const router = express.Router();

/**
 * @description Create a new user from login
 * @route POST /Users
 * @body {email, password}
 * @response 201 {id, fname, lname, email, id, password, faculty, documents, events, jobPostings}
 * @response 400 {error: "Email is required" / "Password is required" / error: "Email already in used" / "Password already taken" / "Error fetching user"}
 */
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" })
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required" })
    }

    const existingUserEmail = await User.findOne({ 
      email
     });

     const existingUserPassword = await User.findOne({ 
      password
     });

    if (existingUserEmail) {
      return res.status(400).json({ error: "Email already in used" })
    }

    if (existingUserPassword) {
      return res.status(400).json({ error: "Password already taken" })
    }

    const user = new User({
      email,
      password,
    });

    await user.save();

    const userDir = path.join(__dirname, "..", "user_data", `${user._id}`); // Directory path ('./user_data/{userId}')
    
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
 * @description Add an event to a user's list of events
 * @route POST /Users/:id/events
 * @param {string} id - User ID
 * @body {string} eventId - The ID of the event to add
 * @response 201 {Array} - Updated list of user"s events
 * @response 404 {error: "User not found" / "Event not found"}
 * @response 400 {error: "Invalid event ID or status" / "Event is already in the user"s list" / "Error adding event"}
 */
router.post("/:id/events", async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.events.some(e => e.id === eventId)) {
      return res.status(400).json({ error: "Event is already in the user\"s list" });
    }

    user.events.push({ id: eventId, event });
    await user.save();

    res.status(201).json(user.events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Add a job posting to a user's list of job postings
 * @route POST /Users/:id/jobPostings
 * @param {string} id - User ID
 * @body {string} jobPostingId - The ID of the job posting to add
 * @body {string} status - Status of the job posting ("Pending", "In Progress", "Approved", "Rejected")
 * @response 201 {Array} - Updated list of user's job postings
 * @response 404 {error: "User not found" / "Job posting not found"}
 * @response 400 {error: "Invalid job posting ID or status" / "Job posting is already in the user"s list" / "Error adding job posting"}
 */
router.post("/:id/jobPostings", async (req, res) => {
  try {
    const { jobPostingId, status } = req.body;

    if (!jobPostingId || !["Pending", "In Progress", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid job posting ID or status" });
    }

    const jobPosting = await JobPosting.findById(jobPostingId);
    if (!jobPosting) {
      return res.status(404).json({ error: "Job posting not found" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.jobPostings.some(j => j.id === jobPostingId)) {
      return res.status(400).json({ error: "Job posting is already in the user\"s list" });
    }

    user.jobPostings.push({ id: jobPostingId, posting: jobPosting, status });
    await user.save();

    res.status(201).json(user.jobPostings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Get all users
 * @route GET /Users
 * @response 200 [{id, fname, lname, email, id, password, faculty, documents, events, jobPostings}
 * @response 400 {error: "Error fetching user"}
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
* @description Get user by any field (Except password, documents, events and job postings & need at least one field)
* @route GET /Users?fname=Fname&lname=Lname&email=Email&id=ID&faculty=Faculty
* @param {string} fname - User First Name (optional)
* @param {string} lname - User Last Name (optional)
* @param {string} email - User Email (optional)
* @param {string} id - User Student ID (optional)
* @param {string} faculty - User Faculty (optional)
* @response 200 [{id, fname, lname, email, id, password, faculty, documents, events, jobPostings}]
* @response 404 {error: "No user found"}
* @response 400 {error: "Error fetching user"}
*/
router.get("/", async (req, res) => {
  try {
    const { fname, lname, email, id, faculty } = req.query;

    const query = {}

    if (fname) query.fname = fname;
    if (lname) query.lname = lname;
    if (email) query.email = email;
    if (id) query.id = id;
    if (faculty) query.faculty = id;

    const users = await User.find(query);

    if (users.length === 0) {
      return res.status(404).json({ error: "No user found" });
    }

    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Get a specific user by id (Given in Mongo)
 * @route GET /Users/:id
 * @param {string} id - User id
 * @response 200 {id, fname, lname, email, id, password, faculty, documents, events, jobPostings}
 * @response 404 {error: "User not found"}
 * @response 400 {error: "Error fetching user"}
 */
router.get("/:id", async (req, res) => {
  try {
    const job = await User.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Get a specific user by email and/or id (student id) (Need at least one field)
 * @route GET /Users?email=Email&id=Id
 * @param {string} id - User ID (Optional)
 * @param {string} email - User Email (Optional)
 * @response 200 {id, fname, lname, email, id, password, faculty, documents, events, jobPostings}
 * @response 404 {error: "User not found"}
 * @response 400 {error: "Error fetching user"}
 */
router.get("/", async (req, res) => {
  try {
    const { email, id } = req.query;

    const query = {};

    if (email) query.email = email;
    if (id) query.id = id;

    const user = await User.find(query);
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
 * @description Update events for a specific user
 * @route PUT /Users/:id/events
 * @param {string} id - User id
 * @body {events} - Array of events
 * @response 200 {updated user events array}
 * @response 404 {error: "User not found"}
 * @response 400 {error: "Events must be an array" / "Error updating events" / "One or more event IDs are invalid"}
 */
router.put("/:id/events", async (req, res) => {
  try {
    const { events } = req.body;

    if (!Array.isArray(events)) {
      return res.status(400).json({ error: "Events must be an array" });
    }

    const validEvents = await Event.find({ _id: { $in: events } });

    if (validEvents.length !== events.length) {
      return res.status(400).json({ error: "One or more event IDs are invalid" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.events = events;
    await user.save();

    res.json(user.events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Update job postings for a specific user
 * @route PUT /Users/:id/jobPostings
 * @param {string} id - User id
 * @body {jobPostings} - Array of job postings
 * @response 200 {updated user jobPostings array}
 * @response 404 {error: "User not found"}
 * @response 400 {error: "Error updating job postings"}
 */
router.put("/:id/jobPostings", async (req, res) => {
  try {
    const { jobPostings } = req.body;

    if (!Array.isArray(jobPostings)) {
      return res.status(400).json({ error: "Job postings must be an array" });
    }

    const validJobPostings = [];
    for (const posting of jobPostings) {
      const { id, posting: postingId, status } = posting;

      if (!id || !postingId || !status) {
        return res.status(400).json({ error: "Each job posting must include id, posting, and status" });
      }

      if (!["Pending", "In Progress", "Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ error: `Invalid status for job posting with id: ${id}` });
      }

      const validPosting = await JobPosting.findById(postingId);
      if (!validPosting) {
        return res.status(400).json({ error: `Job posting with ID ${postingId} does not exist` });
      }

      validJobPostings.push({ id, posting: postingId, status });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.jobPostings = validJobPostings;
    await user.save();

    res.status(200).json(user.jobPostings);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

/**
 * @description Delete user by id
 * @route DELETE /Users/:id
 * @param {string} id - User ID
 * @response 200 {message: "User deleted successfully", updatedEvents}
 * @response 404 {error: "User not found"}
 * @response 400 {error: "Error deleting user"}
 */
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userDir = path.join(__dirname, "..", "user_data", user.id); // Directory path ('./user_data/{userId}')
    
    if (fs.existsSync(userDir)) {
      fs.rmdirSync(userDir, { recursive: true });
    }

    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * @description Delete a user and their associated directory and documents
 * @route DELETE /Users/:id
 * @param {string} id - User ID
 * @param {string} documentId - Document name
 * @response 200 {message: "User deleted successfully" }
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
 * @description Delete a specific event for a user
 * @route DELETE /Users/:userId/events/:eventId
 * @param {string} userId - User ID
 * @param {string} eventId - Event ID
 * @response 200 {message: "Event deleted successfully", updatedEvents}
 * @response 404 {error: "User not found" / "Event not found"}
 * @response 400 {error: "Error deleting event"}
 */
router.delete("/:userId/events/:eventId", async (req, res) => {
  try {
    const { userId, eventId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const eventIndex = user.events.findIndex((event) => event.id === eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ error: "Event not found" });
    }

    user.events.splice(eventIndex, 1); // Remove the event from the array
    await user.save();

    res.json({ message: "Event deleted successfully", updatedEvents: user.events });
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

    const postingIndex = user.jobPostings.findIndex((posting) => posting.id === jobPostingId);

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

module.exports = router;