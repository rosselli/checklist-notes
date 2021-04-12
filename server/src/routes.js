const express = require('express');
const routes = express.Router();
const payloadStructure = require('./payload-structure');

routes.get('/copy', (req, res) => res.json({ message: 'Copied.'}));
routes.get('/structure', (req, res) => res.send(payloadStructure.exportJSON()));
module.exports = routes;
