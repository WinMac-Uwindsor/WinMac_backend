const express = require('express');
const eventListController = require('../controller/eventList.controller');
const router = express.Router();

router.route('/').get(eventListController.getAllEvents);

router.route('/eventDetails').post(eventListController.eventDetails);

module.exports = router;