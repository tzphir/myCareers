const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());

const userRoutes = require('./routes/userRoutes');

mongoose.connect("mongodb://localhost:27017/MyCareersDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

app.use('/user', userRoutes);


app.listen(5000, () => {
    console.log("server is running")
});

