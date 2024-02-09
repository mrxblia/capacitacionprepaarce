const express = require('express');
const route  = express.Router();    
const profile = require('../events/profile')
const CryptoJS=require('crypto-js') 
const key = require('../keys/key');
module.exports = app=>{  
     
    //SESION REGISTRO 
    route.get('/my_:id',profile.my_profile)  
     
    app.use('/profile',route)
};