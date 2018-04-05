const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const connectionString =
  'postgres://hylhdocbwnyrbb:e43532b822bc862476509d193bbd4098b6206f9dd5933e9a6c10f18772080a4a@ec2-54-83-19-244.compute-1.amazonaws.com:5432/d349l7shi4oqt2?ssl=true';

const app = express();
app.use(bodyParser.json());

const port = 34451;

app.get('/', (req, res) => {
  // gets the database connection
  const db = req.app.get('db');
  // sends command in the getAllInjuries.sql to database
  db.getAllInjuries().then((injuries) => {
    // returns all injuries from database
    res.send(injuries).end();
  });
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db');
  const state = req.query.state;

  if (state) {
    db.getIncidentsByState({ state: state }).then((incidents) => {
      res.send(incidents).end();
    });
  } else {
    db.getAllIncidents().then((incidents) => {
      res.send(incidents).end();
    });
  }
});

app.post('/incidents', (req, res) => {
  const incidents = req.body;
  const db = req.app.get('db');

  db.createIncident(incidents).then((sqlRes) => {
    res.send(sqlRes).end();
  });
});

massive(connectionString).then((res) => {
  app.set('db', res);
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
});
