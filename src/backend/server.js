const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());

mongoose.connect("mongodb://localhost:27017/MyCareersDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

app.use('/home', homeRoute);
app.use('/signin', signinRoute);
app.use('/login', loginRoute);


app.listen(5000, () => {
    console.log("server is running")
});

