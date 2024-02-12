const express = require('express');
const route  = express.Router();    
const session = require('../events/sessions')
const CryptoJS=require('crypto-js') 
const key = require('../keys/key');
module.exports = app=>{  
    function ensureToken(req,res,next){ 
        const tokenheader = req.headers['token']; 
        const idheader = req.headers['id']; 
        if(typeof tokenheader !=='undefined' && typeof idheader !=='undefined'){  
            req.token=tokenheader;
            req.idUserBuyer=CryptoJS.AES.decrypt(idheader,key.KEY_ID_USER_ENCRYPT).toString(CryptoJS.enc.Utf8);  console.log('??')
            next()
        }else{
            console.log('Hola') 
            res.sendStatus(403).json({status:false,msg:'Sesion expirada.'})
        }
    } 
    const validateidUser = (req, res, next) => {
        if (!req.headers.id_user) {
            return res.status(400).json({ status:false, msg:'Ocurrio un error al encontrar tu usuario' });
        }else{console.log(key.KEY_ID_USER_ENCRYPT);
            req.headers.id_user=CryptoJS.AES.decrypt(req.headers.id_user, key.KEY_ID_USER_ENCRYPT).toString(CryptoJS.enc.Utf8);
          console.log(req.headers);
        } 
        // Si los datos son válidos, continuamos con la siguiente función
        next();
    };
    //SESION REGISTRO
    route.post('/add_new_user_',session.add_user)//Add user seller 
    route.post('/login_',session.login_)//Login buyer 
    //Session Seller 
    app.use('/session',route)
};