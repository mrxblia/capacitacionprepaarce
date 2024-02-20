const evt = {};
const {User, Document} = require('../database/tables/index'); 
const moment = require('moment');
const CryptoJS=require('crypto-js') 
const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const { codePhoneGenerate, codeEmailGenerate } = require('../helpers/tools');
const key = require('../keys/key');
//Programar phone menssage
 
evt.validate_certificaction = async (req,res)=>{
    const fol = req.params.id;
    await Document.findOneAndUpdate({_id:fol},{status:true})
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
evt.profile_certificate = async (req,res)=>{
    
    const fol = req.params.id;
 
    let id = req.params.id;
    try{
        const profile = await Document.findOne({folio:fol}).populate({
            path: 'id_certification',populate: {
                path: 'id_signature',
            },
            
        }); 
         
            // Parsea la fecha original al formato de Moment.js
            const parsedDate = moment.utc(profile.start, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
            const parsedDateFinish = moment.utc(profile.finish, 'YYYY-MM-DDTHH:mm:ss.SSSZ');

            // Formatea la fecha en español y solo muestra la fecha
            const formattedStart = parsedDate.locale('es').format('D [de] MMMM [del] YYYY');
            const formattedFinish = parsedDateFinish.locale('es').format('D [de] MMMM [del] YYYY');
            
            const data={
            }
            data.name = profile.name, 
            data.lastnames = profile.lastnames, 
            data.status = profile.status,
            data.data_register = profile.data_register,
            data.id_certification = profile.id_certification,
            data.folio = profile.folio,
            data.qr = profile.qr,
            data.start = formattedStart,
            data.finish = formattedFinish, 
            res.render('profile_certificate',{profile:data})
        }
        catch(err){
            res.render('err',{err:err})
        }
}

module.exports = evt;