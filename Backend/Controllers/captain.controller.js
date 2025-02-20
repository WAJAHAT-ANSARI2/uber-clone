const captainModel = require('../Models/captain.model');
const captainService = require('../services/captain.service');
const {validationREsult} = require('express-validator');


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationREsult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.aray()});
    }
    const {fullnamme, email, password, vehicle} = req.body;
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname: fullnamme.firstname,
        lastname: fullnamme.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });
    
    const token = captain.generateAuthToken();
    res.status(201).json({token, captain});
    
}