const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);
  // Q: Should there be a dynamic list of Services / Registration for an Event bus?
  axios.post('http://posts-clusterip-srv:4000/events', event);  // Posts Service
  axios.post('http://comments-srv:4001/events', event);  // Comments Service
  axios.post('http://query-srv:4002/events', event);  // Query Service
  axios.post('http://moderation-srv:4003/events', event);  // Moderation Service

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Event Bus Listening on 4005')
});