const userModel = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainModel = require('../Models/captain.model');
const blackListTokenModel = require('../Models/blackListToken.model')

module.exports.authUser = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split('')[1];
    if (!token){
        return res.status(401).json({message: 'unauthorized'});
    }

    const isBlacklisted = await blackListTokenModel.findOne({token: token});
    if(!isBlacklisted){
        return res.status(401).json({message: 'unauthorized'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._Id)
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({message: 'unauthorized'})
    }
}

module.exports.authCaptain = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split('')[1];
    if (!token){
        return res.status(401).json({message: 'unauthorized'});
    }

    const isBlacklisted = await blackListTokenModel.findOne({token: token});
    if(!isBlacklisted){
        return res.status(401).json({message: 'unauthorized'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._Id)
        req.captain = captain;
        return next();
    } catch (err) {
        return res.status(401).json({message: 'unauthorized'})
    }
}