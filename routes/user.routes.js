const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();

router.route("/login").post(userController.loginUser);


module.exports = router;
