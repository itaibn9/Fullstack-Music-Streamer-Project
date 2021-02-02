const app = require('./app');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})