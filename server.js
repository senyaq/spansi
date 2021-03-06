import bodyParser from 'body-parser';
import * as db from './utils/DataBaseUtils';
// const listNotes = require('./utils/DataBaseUtils.js');
// const createNote = require('./utils/DataBaseUtils.js');
// const deleteNotes = require('./utils/DataBaseUtils.js');
const express = require('express');
const path = require('path');
const app = express();

db.setUpConnection();

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'react_project/build')));

// Put all API endpoints under '/api'
app.get('/express_backend', (req, res) => {
  const count = { text: 'bakend massage' };
  // Return them as json
  res.json(count);
  console.log(`Sent ${count} passwords`);
});

app.get('/notes', (req, res) => {
  console.log(`db`, db);
  db.listNotes().then(data => {
    console.log(`data`, data);
    res.json(data);
  });
});

app.post('/notes', (req, res) => {
  console.log('req.body', req.body);
  db.createNote(req.body).then(data => res.json(data));
});

app.delete('/notes/:id', (req, res) => {
  db.deleteNotes(req.params.id).then(data => res.json(data));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/react_project/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);

// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// // const path = require('path');

// if (process.env.NODE_ENV === 'production') {
//   const path = require('path');
//   // Exprees will serve up production assets
//   app.use(express.static('react_project/build'));
// //   app.use(express.static(path.join(__dirname, 'resact_project/build')));

//   // Express serve up index.html file if it doesn't recognize route

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'react_project', 'build', 'index.html'));
//   });
// }

// // console.log that your server is up and running
// app.listen(port, () => console.log(`Listening on port ${port}`));

// // create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT !!!177' });
// });
