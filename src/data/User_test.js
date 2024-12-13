const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const BASE_USER_URL = 'http://localhost:8000/Users'; // Replace with your server URL
const BASE_EVENT_URL = 'http://localhost:8000/Events';
const BASE_JOB_URL = 'http://localhost:8000/JobPostings';

// Test Data
const testUser = {
  fname: "John",
  lname: "Doe",
  id: "123456",
  faculty: "Engineering",
}

const testUserSignIn = {
  email: "jd@example.com",
  password: "securepassword123",
};

// Test Event
const testEvent = {
  name: "Tech Conference 2024",
  date: new Date("2024-06-15"),
  location: { country: "Canada", province: "Ontario", city: "Toronto" },
  description: "A conference for tech enthusiasts to explore new trends.",
};

// Test Job Posting
const testJobPosting = {
  title: "Software Engineer",
  company: "TechCorp",
  date: new Date("2025-05-01"),
  location: { country: "United States", province: "California", city: "San Francisco" },
  modality: { status: "full-time" },
  description: "Join our team as a Software Engineer to build cutting-edge solutions.",
};

// Helper Function to Log Results
const logResult = (description, result) => {
  console.log(`\n--- ${description} ---`);
  console.log(result.data || result.message);
};

// Run User test
(async () => {
  try {
    // 1. Create a New User
    let response = await axios.post(`${BASE_USER_URL}/`, testUserSignIn);
    let user_id = response.data._id;
    console.log(user_id);
    logResult("Create User", response);

    // 2. Add name
    response = await axios.put(`${BASE_USER_URL}/${user_id}`, testUser)
    logResult("Update User", response);

    // 2. Get All Users
    response = await axios.get(`${BASE_USER_URL}/`);
    logResult("Get All Users", response);

    // 3. Get User by ID
    response = await axios.get(`${BASE_USER_URL}/${user_id}`);
    logResult("Get User by ID", response);

    // 4. Update User
    const updatedUser = { ...testUser, lname: "Smith" };
    response = await axios.put(`${BASE_USER_URL}/${user_id}`, updatedUser);
    logResult("Update User", response);

    // 5. Create Event
    response = await axios.post(`${BASE_EVENT_URL}/`, testEvent);
    let event_id = response.data._id;
    console.log(event_id);
    logResult("Create Event", response);

    // 6. Get All Events
    response = await axios.get(`${BASE_EVENT_URL}/`);
    logResult("Get all events", response);

    // 7. Get Event by ID
    response = await axios.get(`${BASE_EVENT_URL}/${event_id}`);
    logResult("Get event by ID", response);

    // 8. Update Event
    const updatedEvent = { ...testEvent, date: new Date("2024-07-20")};
    response = await axios.put(`${BASE_EVENT_URL}/${event_id}`, updatedEvent);
    logResult("Update event date", response);

    // 9. Add Event to User
    const addedEvent = {
      eventId: event_id
    }
    
    response = await axios.post(`${BASE_USER_URL}/${user_id}/events`, addedEvent)
    logResult("Add events to user", response);

    // 10. Delete Event
    response = await axios.delete(`${BASE_EVENT_URL}/${event_id}`);
    logResult("Delete event", response);

    // 11. Create Job Posting
    response = await axios.post(`${BASE_JOB_URL}/`, testJobPosting);
    let job_id = response.data._id;
    console.log(job_id);
    logResult("Create Job Posting", response);

    // 12. Get all Job Posting
    response = await axios.get(`${BASE_JOB_URL}/`);
    logResult("Get all job posting", response);

    // 13. Get Job Posting by ID
    response = await axios.get(`${BASE_JOB_URL}/${job_id}`);
    logResult("Get job posting by ID", response);

    // 14. Update Job Posting
    const updateJobPosting = { ...testJobPosting, title: "Software Intern", term: { status: "winter" } };
    response = await axios.put(`${BASE_JOB_URL}/${job_id}`, updateJobPosting);
    logResult("Update job posting date", response);

    // 15. Add Job Posting to User
    const addedJob = {
      jobPostingId: job_id,
      status: "In Progress"
    }
    response = await axios.post(`${BASE_USER_URL}/${user_id}/jobPostings`, addedJob)
    logResult("Add job posting to user", response);

    // 16. Delete Job Posting
    response = await axios.delete(`${BASE_JOB_URL}/${job_id}`);
    logResult("Delete job posting", response); 

    // 17. Add document
    console.log("Current Working Directory:", process.cwd());
    const documentData = new FormData();

    const filePath = path.resolve(__dirname, "hello.pdf");
    documentData.append("document", fs.createReadStream(filePath));

    response = await axios.post(`${BASE_USER_URL}/${user_id}/documents`, documentData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    logResult("Add document to user", response);

    const uploadedDocumentId = response.data.documents[response.data.documents.length - 1].id;

    // 18. Retrieve document
    response = await axios.get(`${BASE_USER_URL}/${user_id}/documents/${uploadedDocumentId}`, {
      responseType: 'blob', // Treat the file as binary data for proper download handling
    });

    // 19. Delete document
    response = await axios.delete(`${BASE_USER_URL}/${user_id}/documents/${uploadedDocumentId}`);
    logResult("Retrieved document", response);

    // 20. Delete User
    response = await axios.delete(`${BASE_USER_URL}/${user_id}`);
    logResult("Delete User", response);
  } catch (error) {
    console.error(`Error: ${error.response?.data?.error || error.message}`);
  }
})();