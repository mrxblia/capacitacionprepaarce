const express = require('express');
const route  = express.Router();    
const pdf = require('../events/pdf')
const CryptoJS=require('crypto-js') 
const key = require('../keys/key');
module.exports = app=>{  
     
    //SESION REGISTRO 
    route.get('/generate/:id',pdf.generate) 
    route.get('/generate_validation/:id',pdf.generate_validation) 
    app.use('/pdf',route)
};