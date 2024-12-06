// Server main entrypoint
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const jobPostingRoutes = require('./routes/jobPostingRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/users', userRoutes);
app.use('/job-postings', jobPostingRoutes);
app.use('/events', eventRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});