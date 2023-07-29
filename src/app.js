const express = require('express');
const morgan = require('morgan');

//routes
const userRoutes = require('./routes/user.route');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//routes created
app.use('/api/v1/users', userRoutes);

module.exports = app;
