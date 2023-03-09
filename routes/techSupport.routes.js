const express = require('express');
const Complaint = require('../controller/techSupport.controller');
const router = express.Router();

router.route("/newTicket").post(Complaint.addTicket);

router.route("/myTickets").post(Complaint.getAllTickets);

router.route("/deleteTicket").post(Complaint.deleteTicket);

module.exports = router;