const evt = {};
const {User, Acredit, Signature} = require('../database/tables/index'); 
const CryptoJS=require('crypto-js') 
const nodemailer = require('nodemailer')
const {cloudinaryAddImage} = require('../events/cloudinary/cloudinary')
var jwt = require('jsonwebtoken');
const { codePhoneGenerate, codeEmailGenerate } = require('../helpers/tools');
const key = require('../keys/key');
const signature = require('../routes/signature');
//Programar phone menssage
evt.register_new = async (req, res) => {
    console.log(req.files);

    try {
        let img, public_id;
        if (req.files) {
            const result = await cloudinaryAddImage(req.files.image.tempFilePath);
            img = result.secure_url;
            public_id = result.public_id;
        } 
        let name = req.body.name,
            description = req.body.description,
            degree = req.body.degree,
            lastnames = req.body.lastnames,
            id_add_user = CryptoJS.AES.decrypt(req.headers.idtoken,key.KEY_ID_USER_ENCRYPT).toString(CryptoJS.enc.Utf8)

        const sign = new Signature({
            id_add_user: id_add_user,
            public_id:public_id,
            name: name,
            lastnames: lastnames,
            degree: degree,
            description: description,
            image: img, // Usa img en lugar de image
        });

        // Comentado para evitar errores antes de solucionar el problema con la base de datos
        await sign.save();
        console.log(sign)
        res.json({ status: true });
    } catch (err) {
        console.log(err);
        res.json({ status: false, msg: 'Err: Internal server error.' });
    }
};
evt.signatures = async (req,res)=>{
    const sign = await Signature.find();
    res.json({data:sign})
}
evt.status_up = async (req,res)=>{
    try{
        await Signature.findByIdAndUpdate(req.params.id,{status:true});
        res.redirect('/portal/firma_digital');
    }
    catch(err){console.log(err)
        res.status(400).send({msg:"Error interno del servidor"});
    }
    
}
evt.delete = async (req,res)=>{
    try{
        await Signature.findByIdAndDelete(req.params.id);
        res.redirect('/portal/firma_digital');
    }
    catch(err){console.log(err)
        res.status(400).send({msg:"Error interno del servidor"});
    }
    
}
evt.status_down = async (req,res)=>{
    try{
        await Signature.findByIdAndUpdate(req.params.id,{status:false});
        res.redirect('/portal/firma_digital');
    }
    catch(err){console.log(err)
        res.status(400).send({msg:"Error interno del servidor"});
    }
    
}
evt.update_signature_file = async (req,res)=>{
res.json({status:true})

}


module.exports = evt;