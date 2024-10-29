const express = require('express');
const path = require('path');
const adminRoutes = require('./Routes/adminRoutes.js');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

let {PORT,MONGO_URI} = process.env

const app = express();

// Connect to Database
mongoose.connect(MONGO_URI)
.then(result => {console.log('server is connected to mongo')})
.catch((err) =>{console.error(err.message);})

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(cookieParser());

// Landing Page Route
app.get('/', (req, res) => {
  res.redirect('/bookspace');
});

app.get('/bookspace', (req,res) =>{
  res.render('user')
})

app.use('/cars', adminRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
