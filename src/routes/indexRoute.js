const express = require('express');
const router = express.Router();

const userRoute = require('./userRoute.js');
const taskRoute = require('./taskRoute.js');
const userTaskRoute = require('./userTaskRoute.js');

router.use('/user', userRoute);
router.use('/task', taskRoute);
router.use('/userTask', userTaskRoute);

module.exports = router;



