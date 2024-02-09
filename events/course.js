const evt = {};
const {User, Acredit} = require('../database/tables/index'); 
const CryptoJS=require('crypto-js') 
const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const { codePhoneGenerate, codeEmailGenerate } = require('../helpers/tools');
const key = require('../keys/key');
//Programar phone menssage
evt.course_add_new = async (req,res)=>{console.log(req.body)
    try{ 
        let name= req.body.name, description= req.body.description, details=req.body.details, type=req.body.type, signature_type=req.body.signature_type, id_sign=req.body.signature, hours=req.body.hours;
        const ev = new Acredit({name:name,description:description, details:details, type:type, signature_type:signature_type, id_signature:id_sign, hours:hours});
        await ev.save()
        res.json({status:true, msg:'Succesfull!'})
    }
    catch(err){ console.log(err)
        res.json({status:false, msg:'Err: Internal server error.'})
    }
}
evt.certification_add_new = async (req,res)=>{
    try{ 
        let name= req.body.name, description= req.body.description, details=req.body.details, type=req.body.type, signature_type=req.body.signature_type, id_sign=req.body.signature;
        const ev = new Acredit({name:name,description:description, details:details, type:type, signature_type:signature_type, id_signature:id_sign});
        await ev.save()
        res.json({status:true, msg:'Succesfull!'})
    }
    catch(err){ console.log(err)
        res.json({status:false, msg:'Err: Internal server error.'})
    }
}
evt.diplomate_add_new = async (req,res)=>{
    try{ 
        let name= req.body.name, description= req.body.description, details=req.body.details, type=req.body.type, signature_type=req.body.signature_type, id_sign=req.body.signature;
        const ev = new Acredit({name:name,description:description, details:details, type:type, signature_type:signature_type, id_signature:id_sign});
        await ev.save()
        res.json({status:true, msg:'Succesfull!'})
    }
    catch(err){ console.log(err)
        res.json({status:false, msg:'Err: Internal server error.'})
    }
}
evt.status_up = async (req,res)=>{
    try{
        await Acredit.findByIdAndUpdate(req.params.id,{status:true});
        res.redirect('/portal/'+req.params.rt);
    }
    catch(err){console.log(err)
        res.status(400).send({msg:"Error interno del servidor"});
    }
    
}
evt.status_down = async (req,res)=>{
    try{
        await Acredit.findByIdAndUpdate(req.params.id,{status:false});
        res.redirect('/portal/'+req.params.rt);
    }
    catch(err){console.log(err)
        res.status(400).send({msg:"Error interno del servidor"});
    }
    
}
evt.delete = async (req,res)=>{
    try{
        await Acredit.findByIdAndDelete(req.params.id,{status:false});
        res.redirect('/portal/'+req.params.rt);
    }
    catch(err){console.log(err)
        res.status(400).send({msg:"Error interno del servidor"});
    }
    
}



module.exports = evt;