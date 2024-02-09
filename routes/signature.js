const express = require('express');
const route  = express.Router();    
const signature = require('../events/signature')
const CryptoJS=require('crypto-js') 
const key = require('../keys/key');  
const fileUpload=require('express-fileupload'); 
module.exports = app=>{  
    route.post('/register_new',signature.register_new)
    route.post('/update-signature-file',signature.update_signature_file) 
    route.get('/status_up/:id/',signature.status_up)
    route.get('/status_down/:id/',signature.status_down) 
    route.get('/delete/:id/',signature.delete) 
    app.use('/signature',route)
};