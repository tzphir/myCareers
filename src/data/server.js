//Shushi, Thomas

// Server main entrypoint
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const jobPostingRoutes = require('./routes/jobPostingRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Connect to database
connectToDatabase();

app.use(cors());
app.use(express.json());

// API Routes (For CRUDE operations)
app.use('/Users', userRoutes);
app.use('/JobPostings', jobPostingRoutes);
app.use('/Events', eventRoutes);

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
