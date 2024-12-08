const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());

app.use('/home', homeRoute);
app.use('/job-postings', jobPostingRoutes);
app.use('/events', eventRoutes);


app.listen(5000, () => {
    console.log("server is running")
});

