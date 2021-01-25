const app = require('./app');
require('dotenv').config();
const port = process.env.PORT || 8080;

app.listen(process.env.PORT || 8080, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})