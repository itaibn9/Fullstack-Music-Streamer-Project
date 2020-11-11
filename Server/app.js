const express = require('express');
const app = express();
app.use(express.json());

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/', require('./api'))

app.use(unknownEndpoint);



module.exports = app;