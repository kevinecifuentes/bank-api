require('dotenv').config();
// const initModels = require('./models/initModel');
const app = require('./app');
const { db } = require('./database/config');
const initModels = require('./models/initModel');

db.authenticate()
  .then(() => console.log('Database coneccted...🛰️'))
  .catch((err) => console.log(err));

initModels();

db.sync()
  .then(() => console.log('Database synchronized...📡'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3996;
app.listen(PORT, () => {
  console.log(`App Runnig on port ${PORT}...🚀`);
});


