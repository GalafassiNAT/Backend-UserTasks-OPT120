const express = require('express');
const router = express.Router();

const userRoute = require('./userRoute.js');
const taskRoute = require('./taskRoute.js');
const userTaskRoute = require('./userTaskRoute.js');
const requireTokenJWT = require('../middlewares/RequireJWT');
const loginRoute = require('./loginRoute.js');

router.use('/login', loginRoute)
router.use('/user', userRoute);
router.use('/task', requireTokenJWT, taskRoute);
router.use('/userTask', requireTokenJWT, userTaskRoute);

module.exports = router;



