const express = require('express');
const attendController = require('../controller/eventAttend.controller');
const router = express.Router();

router.route("/attended").post(attendController.addEvent);

router.route("/myAttendance").post(attendController.myEvent);

module.exports = router;