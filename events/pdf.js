const evt = {};
const {User,Acredit, Document, Signature} = require('../database/tables/index'); 
const CryptoJS=require('crypto-js') 
const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const { codePhoneGenerate, codeEmailGenerate } = require('../helpers/tools');
const {pdfGenerate, pdfValidation }= require('./pdf_functions/pdf');
const key = require('../keys/key');
//Programar phone menssage
evt.generate = async (req, res) => {
    try {
         const data_ = await Document.findOne({_id:req.params.id}) .populate({
            path: 'id_certification',
            populate: {
                path: 'id_signature',
            },
        });
        const stream = res.writeHead(200,{
         'Content-Type': 'application/pdf',
         'Content-Disposition':"attachment; filename-invoice.pdf"
        })  
        pdfGenerate(data_,(data)=>stream.write(data),()=>{
            stream.end() 
        })
              
    } catch (err) {console.log(err)
        res.json({status:false,msg:'Error interno en el servidor'});
    }
}

evt.generate_validation = async (req, res) => {
    try {
         const data_ = await Document.findOne({_id:req.params.id}) .populate({
            path: 'id_certification',
            populate: {
                path: 'id_signature',
            },
        });
        const stream = res.writeHead(200,{
         'Content-Type': 'application/pdf',
         'Content-Disposition':"attachment; filename-invoice.pdf"
        }) 
        await pdfValidation(data_,(data)=>stream.write(data),()=>{
            stream.end() 
        }) 
              
    } catch (err) {console.log(err)
        // Solo envía una respuesta si no se ha enviado ya
        if (!res.headersSent) {
            res.json({status: false, msg: 'Error interno en el servidor'});
        }
    }
}

module.exports = evt;