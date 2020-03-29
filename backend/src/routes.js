const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.index);
routes.get('/ongs/:id', OngController.listById);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.get('/incidents/:id', IncidentController.listById);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/session', SessionController.create);

module.exports = routes;