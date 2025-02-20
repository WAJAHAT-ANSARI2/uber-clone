const captainController = require('../Controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require('../middlewares/auth.middlewares');


router.post('./register',[
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 character long'),
        body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
        body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
        body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long'),
        body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be atleast 1'),
        body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
],
    captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Invalid Password')
],
userController.loginUser
)

router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile)
router.get('/logout',authMiddleware.authCaptain, captainController.logoutUser)



module.exports = router;