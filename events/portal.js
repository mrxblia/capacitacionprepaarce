const evt = {};
const {User,Acredit, Document, Signature} = require('../database/tables/index'); 
const CryptoJS=require('crypto-js') 
const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const { codePhoneGenerate, codeEmailGenerate } = require('../helpers/tools');
const key = require('../keys/key');
//Programar phone menssage
evt.test = async (req, res) => {
    try { 
        const result = await Acredit.updateMany({name:'Inglés Avanzado'} , { $set: { hours: 54 } });

    } catch (err) {
        res.send('Error'+err)
    }
}
evt.portal = async (req, res) => {
    try {
        const data = await Document.find({}).populate({
            path: 'id_certification',
            select: 'name' // Seleccionar el campo 'name' de la tabla 'Course'
        }).sort({ name: 1 })
        const dataCertif = await Acredit.find({status:true}).sort({ name: 1 }); 
        const certificationsTrue = data.filter(item => item.status === true);
        const certificationsFalse = data.filter(item => item.status === false); 
        res.render('portal', { certificationsTrue, certificationsFalse, dataCertif });
    } catch (err) {
        res.send('Error'+err)
    }
}
evt.courses = async (req,res)=>{
    await Acredit.find({type:'Curso'}).populate({
        path: 'id_signature', 
    }).sort({ name: 1 })
    .then(async(data)=>{
        await Signature.find({status:true}).sort({ name: 1 })
        .then((sign)=>{
            res.render('courses',{data:data,signature:sign})
        })
        .catch((err)=>{
            console.log(err)
            res.json({status:false,msg:err})
        })
    
    })
    .catch((err)=>{console.log(err)
        res.render('err') 
    })
} 
evt.certifications = async (req,res)=>{
    await Acredit.find({type:'certification'}).populate({
        path: 'id_signature', 
    })
    .then(async(data)=>{
        await Signature.find({status:true})
        .then((sign)=>{
            res.render('certifications',{data:data,signature:sign})
        })
        .catch((err)=>{
            console.log(err)
            res.json({status:false,msg:err})
        })
    
    })
    .catch((err)=>{
        res.render('err') 
    })
} 
evt.diplomates = async (req,res)=>{
    await Acredit.find({type:'diplomate'}).populate({
        path: 'id_signature', 
    })
    .then(async(data)=>{
        await Signature.find({status:true})
        .then((sign)=>{console.log(data)
            res.render('diplomates',{data:data,signature:sign})
        })
        .catch((err)=>{
            console.log(err)
            res.json({status:false,msg:err})
        })
    
    })
    .catch((err)=>{
        res.render('err') 
    })
}  
evt.firma_digital = async (req,res)=>{
    const sign = await Signature.find();
    res.render('firma_digital',{data:sign});
} 




module.exports = evt;