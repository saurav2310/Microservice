const express = require('express');
const router = express.Router();
const authMiddleWare  = require('../middleware/auth.middleware');
const rideController = require('../controller/ride.controller');

router.post('/create-ride',authMiddleWare.authUser,rideController.createRide);
router.put('/accept-ride',authMiddleWare.authCaptain,rideController.acceptRide);

module.exports = router;