const evt = {};
const {User,Acredit, Document, Signature} = require('../database/tables/index'); 
const CryptoJS=require('crypto-js') 
const nodemailer = require('nodemailer')
const moment = require('moment');
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
        const data = await Document.find().populate({
            path: 'id_certification',
            select: 'name'
        }).sort({ name: 1 })
        console.log(data)
        const dataCertif = await Acredit.find({ status: true }).sort({ name: 1 });
         
        const certificationsTrue = [];
        const certificationsFalse = [];
        for (let i = 0; i < data.length; i++) { 
        console.log('Cilo - 1-'+i)
            const item = data[i];
        
            if (item.status === true) { 
                let ct = {}
                // Parsea la fecha original al formato de Moment.js
                const parsedDate = moment.utc(item.start, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                const parsedDateFinish = moment.utc(item.finish, 'YYYY-MM-DDTHH:mm:ss.SSSZ');

                // Formatea la fecha en español y solo muestra la fecha
                const formattedStart = parsedDate.locale('es').format('D [de] MMMM [del] YYYY');
                const formattedFinish = parsedDateFinish.locale('es').format('D [de] MMMM [del] YYYY');
            
                ct.id=item.id;
                ct.name=item.name
                ct.lsatnames=item.lastnames
                ct.id_certification=item.id_certification
                ct.id_certification.id=item.id_certification.id
                ct.id_certification.name=item.id_certification.name
                ct.start = formattedStart;
                ct.finish=formattedFinish
                ct.folio=item.folio
                ct.qr=item.qr

                certificationsTrue.push(ct); 
            } else {  
                let ct = {}
                // Parsea la fecha original al formato de Moment.js
                const parsedDate = moment.utc(item.start, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                const parsedDateFinish = moment.utc(item.finish, 'YYYY-MM-DDTHH:mm:ss.SSSZ');

                // Formatea la fecha en español y solo muestra la fecha
                const formattedStart = parsedDate.locale('es').format('D [de] MMMM [del] YYYY');
                const formattedFinish = parsedDateFinish.locale('es').format('D [de] MMMM [del] YYYY');
 
                ct.id=item. id;
                ct.name=item.name
                ct.lsatnames=item.lastnames
                ct.id_certification=item.id_certification
                ct.id_certification.id=item.id_certification.id
                ct.id_certification.name=item.id_certification.name
                ct.start = formattedStart;
                ct.finish= formattedFinish;
                ct.folio=item.folio
                ct.qr=item.qr
                certificationsFalse.push(ct); 
            }
        } 
        if(req.session.authenticated ){ 
            if(req.session ==undefined ){
                res.redirect("/login.html") 
            }else{
                res.render('portal', { moment, certificationsTrue, certificationsFalse, dataCertif });
            }

        }else{
            res.redirect("/login.html") 
        }
    } catch (err) {
        console.log(err);
        res.send('Error' + err);
    }
}


evt.courses = async (req,res)=>{
    if(req.session.authenticated ){ 
        if(req.session ==undefined ){
            res.redirect("/login.html") 
        }else{
            
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

    }else{
        res.redirect("/login.html") 
    }
    
    
} 
evt.certifications = async (req,res)=>{
    if(req.session.authenticated ){ 
        if(req.session ==undefined ){
            res.redirect("/login.html") 
        }else{ 
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

    }else{
        res.redirect("/login.html") 
    }
} 
evt.diplomates = async (req,res)=>{
    if(req.session.authenticated ){ 
        if(req.session ==undefined ){
            res.redirect("/login.html") 
        }else{
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

    }else{
        res.redirect("/login.html") 
    }
}  
evt.firma_digital = async (req,res)=>{
    if(req.session.authenticated ){ 
        if(req.session ==undefined ){
            res.redirect("/login.html") 
        }else{
            
            const sign = await Signature.find();
            res.render('firma_digital',{data:sign});
        }

    }else{
        res.redirect("/login.html") 
    }
    
} 




module.exports = evt;