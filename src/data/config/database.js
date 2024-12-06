const mongoose = require('mongoose');

const connectToDatabase = (uri) => {
  const connection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.on('connected', () => {
    console.log(`Connected to database: ${uri}`);
  });

  connection.on('error', (error) => {
    console.error(`Error connecting to database: ${uri}`, error);
  });

  return connection;
};

// Export connections
module.exports = {
  usersDB: connectToDatabase('mongodb://localhost:27017/usersDB'),
  jobPostingsDB: connectToDatabase('mongodb://localhost:27017/jobPostingsDB'),
  eventsDB: connectToDatabase('mongodb://localhost:27017/eventsDB'),
};