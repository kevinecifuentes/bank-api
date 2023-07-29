require('dotenv').config();

const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('db authenticated'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('db synchronized!'))
  .catch((err) => console.log(err));

const app = require('./app.js');

const PORT = process.env.PORT || 3202;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
