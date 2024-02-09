const express = require('express');
const route  = express.Router();    
const session = require('../events/portal')
const CryptoJS=require('crypto-js') 
const key = require('../keys/key');
module.exports = app=>{    
     
    //CONSULTAS SERVER DB (MICROSEVICE)
    route.get('/',session.portal)
    route.get('/test',session.test)
    route.get('/courses',session.courses)
    route.get('/certifications',session.certifications)
    route.get('/diplomates',session.diplomates)
    route.get('/firma_digital',session.firma_digital)
    app.use('/portal',route)
};