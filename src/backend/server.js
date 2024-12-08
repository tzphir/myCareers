const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const app = express();
app.use(cors());
app.use(express.json())

const userRoutes = require('./routes/userRoutes');

mongoose.connect("mongodb://localhost:27017/MyCareersDatabase");

app.use('/user', userRoutes);


app.listen(5000, () => {
    console.log("server is running")
});
