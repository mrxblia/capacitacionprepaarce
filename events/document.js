const evt = {};
const {User, Document} = require('../database/tables/index'); 
const CryptoJS=require('crypto-js') 
const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const { codePhoneGenerate, codeEmailGenerate } = require('../helpers/tools');
const key = require('../keys/key');
const QRCode = require('qrcode');
  // Para uuid
const { v4: uuidv4 } = require('uuid');
const { registerFont } = require('pdfkit');
// Función para generar folio con uuid
function generateFolio() {
    
    const uuid = uuidv4();
    const soloNumeros = uuid.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    const folioNumerico = soloNumeros.substr(0, 7); // Obtiene los primeros 7 dígitos

    return folioNumerico.padStart(7, '0');
}


evt.register_new_certificate = async (req, res) => {
    try {
        const folio = generateFolio(); // Define esta función según el paquete que hayas elegido
        id_();
        async function id_(){
            const data = await Document.find({folio:folio});
            if(data && data.length > 0) console.log(data); 
            else registerDoc()
        }
       
        async function registerDoc(){
            const certif = new Document();
            console.log(certif.id); 
            let urlData = 'https://validacioncertificados.vercel.app/certification/profile/' + certif.folio;

            const url = await new Promise((resolve, reject) => {
                QRCode.toDataURL(urlData, (err, url) => {
                    if (err) {
                        console.error(err);
                        reject('Error al generar el código QR.');
                    } else {
                        resolve(url);
                    }
                });
            }); 
            certif.name = req.body.name;
            certif.lastnames = req.body.lastnames;
            certif.id_certification = req.body.course_id;
            certif.start = req.body.day_start;
            certif.finish = req.body.day_finish;
            certif.folio = folio;
            certif.qr = url; 
            await certif.save(); 
            res.json({ status: true, msg: 'Succesfull!' });
        }
    } catch (err) {
        console.log(err);
        res.json({ status: false, msg: err });
    }
};


evt.profile_certificate = async (req,res)=>{
    let id = req.params.id;
    try{
    const profile = await Document.findOne({_id:id}).populate({
        path: 'id_certification',populate: {
            path: 'id_signature',
        },
         
    });console.log(profile)
        res.render('profile_certificate',{profile:profile})
    }
    catch(err){
        res.render('err',{err:err})
    }
}

module.exports = evt;