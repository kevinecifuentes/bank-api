const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/app.Error');

//routes
const UserRoutes = require('./routes/user.route');
const transfersRoutes = require('./routes/transfers.route');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//routes
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/', transfersRoutes);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;

