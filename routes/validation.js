const express = require('express');
const route  = express.Router();    
const ev = require('../events/validation')
const CryptoJS=require('crypto-js') 
const key = require('../keys/key');
module.exports = app=>{  
    //SESION REGISTRO 
    route.get('/certification/:id',ev.validate_certificaction)   
    route.get('/certification/delete/:id',ev.delete_certificaction) 
    app.use('/validations',route)
};