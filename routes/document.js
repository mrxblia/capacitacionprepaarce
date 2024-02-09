const express = require('express');
const route  = express.Router();    
const ev = require('../events/document')
const CryptoJS=require('crypto-js') 
const key = require('../keys/key');
module.exports = app=>{  
    //SESION REGISTRO 
    route.get('/profile/:id',ev.profile_certificate) 
    route.post('/register_new_certificate',ev.register_new_certificate) 
    app.use('/certification',route)
};