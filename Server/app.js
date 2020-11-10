// const express = require('express')
// const app = express()
// const cors = require('cors');
// app.use(cors());
// app.use(express.json());
// app.use(logger);

// function logger (req, res, next) {
//     console.log('request fired ' + req.url + ' ' + req.method);
//     next();
// }

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