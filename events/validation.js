const evt = {};
const {User, Document} = require('../database/tables/index'); 
const CryptoJS=require('crypto-js') 
const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const { codePhoneGenerate, codeEmailGenerate } = require('../helpers/tools');
const key = require('../keys/key');
//Programar phone menssage
 
evt.validate_certificaction = async (req,res)=>{
    const fol = req.params.id;
    await Document.findOneAndUpdate({folio:fol},{status:true})
    try{
        res.redirect('/portal')
    }
    catch(err){
        res.json({status:false, msg:'Err. Internal server error.'}) 
    }
}
evt.delete_certificaction = async (req,res)=>{
    const id = req.params.id;
    await Document.findByIdAndDelete(id)
    try{
        res.redirect('/portal')
    }
    catch(err){
        res.json({status:false, msg:'Err. Internal server error.'}) 
    }
}


module.exports = evt;