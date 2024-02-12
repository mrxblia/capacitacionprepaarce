const evt = {};
const {User,Validation, Shop, Token} = require('../database/tables/index'); 
const CryptoJS=require('crypto-js') 
const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const { codePhoneGenerate, codeEmailGenerate } = require('../helpers/tools');
const key = require('../keys/key');
const { generarToken, compararContrasena } = require('../helpers/jwt');
//Programar phone menssage
evt.add_user = async (req,res)=>{
    try {
        console.log(req.body);
        const { name, lastnames, email, phone, user, password, role, birtday } = req.body; 
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
          return res.json({ status: false, code: 204, message: 'Ya existe un usuario con esta información', on: false });
        }  
        const newUser = new User({}); 
        const newToken = new Token({}); 
        let pass = CryptoJS.AES.encrypt(password,key.KEY_PASSWORD).toString();
        newUser.name = name;
        newUser.lastnames = lastnames;
        newUser.email = email;
        newUser.phone = phone;
        newUser.rol = role; 
        newUser.birtday = birtday; 
        newUser.user = user; 
        newUser.password=pass;
        newUser.type_user=1;
        const userN = await newUser.save(); 
        if (userN) { 
          const payload = { check: true };
          const token = jwt.sign(payload, key.KEY_TOKEN, {
            expiresIn: '1h',
          }); 
          newToken.token=token;
          newToken.id_user=userN.id;
          newToken.authenticated=true;
          try{
            const tk= await newToken.save();
            if( tk  ){
                const idCodeUser = CryptoJS.AES.encrypt(userN._id.toString(),key.KEY_ID_USER_ENCRYPT).toString();
                const responseData = {
                    status: true, 
                    message: 'Successful',
                    token: token,
                    data: {
                    name: userN.name,
                    lastnames: userN.lastnames,
                    phone: userN.phone,
                    email: userN.email,
                    photo: userN.photo,
                    birtday: userN.birtday, 
                    },
                    id_user: idCodeUser,
                };  
                res.status(201).json(responseData);
            }else{console.log('err')
            await User.findByIdAndDelete(newUser.id);
                res.json({ status: false, code: 203, message: 'No se pudo guardar en este momento' }); 
            }
          }
          catch(err){
            await User.findByIdAndDelete(newUser.id);
            console.error("Error al crear el Token", err);
            res.send({status:false,message:'Error al intentar registrarte'})
          }
        } else {
          res.json({ status: false, code: 203, message: 'El usuario no se pudo guardar' });
        }
    } 
    catch (err) { 
        if(err.code==11000){
            res.json({status:false, message:'El usuario ya existe'})
        }
        console.error(err);
        res.json({ status: false, code: 203, message: 'El usuario no se pudo guardar' });
    } 
}  
evt.login_ = async (req,res)=>{
    const user = req.body.user; 
    const userLog = await User.findOne(
        {
            $or: [
                { user: user },
                { email: user}, 
                { phone: parseInt(user)||0 }
            ]
        } 
    )
    try{  
        if(userLog){   
            const password = req.body.password; 
            let pass = CryptoJS.AES.decrypt(userLog.password,key.KEY_PASSWORD).toString(CryptoJS.enc.Utf8) 
            console.log(pass)
            if(password==pass){   
                const token = generarToken();
                let idCod=CryptoJS.AES.encrypt(userLog._id.toString(),key.KEY_ID_USER_ENCRYPT).toString(); 
                req.session.user=userLog;
                req.token = token;
                req.session.authenticated=true;
                res.json({
                    message:'Login Successful',
                    status:true,
                    token:token, 
                    id:idCod,
                    on:true,
                    data:userLog[0]
                })
            }else{ 
                res.json({
                    message:'Contraseña incorrecta',
                    status:false,
                    on:false,
                    code:203
                })
            }
        }else{  
            res.json({
                message:'Usuario no encontrado',
                status:false,
                on:false,
                code:203
            })
        }
    }
    catch(err){
        console.log(err);
        res.json({
            message:'Ocurrio un error',
            status:false,
            on:false
        })
    }
}
  


 






module.exports = evt;