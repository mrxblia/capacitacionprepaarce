const evt = {};
const {User,Validation, Shop} = require('../database/tables/index'); 
const CryptoJS=require('crypto-js') 
const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');
const { codePhoneGenerate, codeEmailGenerate } = require('../helpers/tools');
const key = require('../keys/key');
//Programar phone menssage
evt.add_user = async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        } 
        const { name, lastnames, email, phone, password } = req.body;
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
          return res.status(400).json({ status: false, code: 204, msg: 'Ya existe un usuario con esta información', on: false });
        } 
        // Crear usuario
        const newUser = new User({ 
        }); 
        let pass = CryptoJS.AES.encrypt(req.body.password,key.KEY_PASSWORD).toString();
        newUser.name=req.body.name;
        newUser.lastnames=req.body.lastnames;
        newUser.email=req.body.email;
        newUser.phone=req.body.phone;
        newUser.user=req.body.user;
        newUser.active_sessions=false;
        newUser.password=pass;
        newUser.type_user=1;
        const userN = await newUser.save(); 
        if (userN) {
          const phoneCode = codePhoneGenerate();
          const mailCode = codeEmailGenerate();    
          const newValidation = new Validation({
            id_user: userN._id,
            email: mailCode,
            phone: phoneCode,
          });
          await newValidation.save();
          // Configurar nodemailer
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'devfernandorm11@gmail.com',
              pass: 'jviedmytysarykxt',
            },
          });
          // Enviar correo electrónico
          let info = await transporter.sendMail({
            from: 'devfernandorm11@gmail.com',
            to: email,
            subject: 'Activacion de cuenta email✔',
            text: `Hola, tu código de activación es\nCorreo: ${mailCode}\nCelular: ${phoneCode}`,
          });    
          console.log('Email Enviado correctamente'); 
          // Generar token y respuesta
          const payload = { check: true };
          const token = jwt.sign(payload, key.KEY_TOKEN, {
            expiresIn: '5m',
          }); 
          const idCodeUser = CryptoJS.AES.encrypt(userN._id.toString(),key.KEY_ID_USER_ENCRYPT).toString();
          const responseData = {
            status: true,
            code: 201,
            msg: 'Successful',
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
        } else {
          res.status(500).json({ status: false, code: 203, msg: 'El usuario no se pudo guardar' });
        }
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ status: false, code: 203, msg: 'El usuario no se pudo guardar' });
    } 
}
evt.send_code_again = async (req,res)=>{
    User.find({$or:[{email:req.body.email},{phone:req.body.pone}]})
    .then((user))
    if(user.length>0){
        if(user.status==false){
            console.log('El usuario ya existe')
            //Solucionar problema
            res.json({status:false,code:204,msj:'User no finish your account',on:false})
        }else if(user.status==true){

            res.json({status:false,code:204,msj:'User exist. Is a account active',on:false})
        }
    }
} 
evt.validation_user_account_ = async (req,res)=>{ 
    let idUs=req.idUserBuyer;console.log(req.idUserBuyer)
    const val = await Validation.findOne({id_user:idUs})
    try{
        if(req.body.code_email==val.email){
            if(req.body.code_phone==val.phone){
                const us = await User.findByIdAndUpdate({_id:val.id_user},{status:true,validations:{email:true,phone:true}})
                res.json({status:true,code:200,msg:'Cuenta verificada. EMAIL:PHONE',data:us})
            }else{
                res.json({status:false,code:444,msg:'Codigo de celular invalido'})
            }
        }else{
            if(req.body.code_phone==val.phone){
                res.json({status:false,code:200,msg:'El codigo de correo esta mal'})
            }else{
                res.json({status:false,code:200,msg:'Ambos codigos estan mal'})
            } 
        }
    }catch(err){
        console.log(err)
        res.json({status:false,code:444,msg:'Internal Server Err:'})
    } 
     
}
evt.login_ = async (req,res)=>{
    const user = req.body.user;console.log('Hola?')
    const userLog = await User.findOne(
        {
            $or: [
                { email: user}, 
                { phone: parseInt(user)||0 }
            ]
        } 
    )
    try{console.log(userLog.password)
        //Comparacion user existente
        if(userLog){  
            // Hashear la contraseña original
            const password = req.body.password; 
            let pass = CryptoJS.AES.decrypt(userLog.password,key.KEY_PASSWORD).toString(CryptoJS.enc.Utf8)
            console.log(pass);console.log('Fue pass')
            //Comparacion password igual
            if(password==pass){ 
                console.log('Antes del successful')
                const payload ={
                    check:true
                };
                const token = jwt.sign(payload,key.KEY_TOKEN,{
                    expiresIn:'1m' 
                }); 
                console.log('success')
                console.log(userLog.id)
                let idCod=CryptoJS.AES.encrypt(userLog._id.toString(),key.KEY_ID_USER_ENCRYPT).toString(); 
                res.json({
                    msg:'Login Successful',
                    status:true,
                    token:token, 
                    id:idCod,
                    on:true,
                    data:userLog[0]
                })
            }else{
                //Password incorrecto
                console.log('Password incorrecto1')
                res.json({
                    msg:'Contraseña incorrecta',
                    status:false,
                    on:false,
                    code:203
                })
            }
        }else{
            //Password incorrecto
            console.log('User no encontrado')
            res.json({
                msg:'Usuario no encontrado',
                status:false,
                on:false,
                code:203
            })
        }
    }
    catch(err){
        console.log(err);
        res.json({
            msg:'Ocurrio un error',
            status:false,
            on:false
        })
    }
}

//Partimos de aqui con los eventos para el vendedor
evt.login_user_seller = async (req,res)=>{  
    const user = req.body.user;
    const userLog = await User.findOne(
        {
            $or: [
                { email: user}, 
                { phone: parseInt(user)||0 }
            ]
        } 
    )
    try{console.log(userLog)
        //Comparacion user existente
        if(userLog){
            // Hashear la contraseña original
            const password = req.body.password; 
            let pass = CryptoJS.AES.decrypt(userLog.password,key.KEY_PASSWORD).toString(CryptoJS.enc.Utf8)
            console.log(pass);console.log('Fue pass')
            //Comparacion password igual
            if(password==pass){ 
                console.log('Antes del successful')
                const payload ={
                    check:true
                };
                const token = jwt.sign(payload,key.KEY_TOKEN,{
                    expiresIn:'1m' 
                });  
                let idCod=CryptoJS.AES.encrypt(userLog.id.toString(),key.KEY_ID_USER_ENCRYPT).toString();  
                Shop.findOne({id_user:userLog.id})
                .then((dat)=>{ 
                      if(dat){    console.log('Existre')  ;console.log(dat)  
                        let idShop=CryptoJS.AES.encrypt(dat.id.toString(),key.KEY_ID_SHOP_ENCRYPT).toString();   
                        res.json({
                            msj:'Login logrado',
                            status:true,
                            id:idCod,
                            token:token,
                            idShop:idShop,
                            id_user:idCod,
                            on:true,
                            data:userLog[0]
                        })
                      }else{       
                        res.json({
                            msj:'Login logrado',
                            status:true,
                            idShop:'NULL-DATA',
                            token:token, 
                            id:idCod,
                            on:true,
                            data:userLog[0]
                        })
                        
                      }
                })
                .catch((err)=>{console.log(err)
                    res.json({
                        msj:'Internal server err',
                        status:false,
                        on:false,
                        code:203
                    })
                })
            }
            else{ 
                res.json({
                    msg:'Password invalido',
                    status:false, 
                    code:203
                })

            }
        }else {  
            console.log('err');
            res.json({
                msg:'Usuario Invalido.',
                status:false,
                on:false,
                code:203
            })
        }
    }
    catch(err){
        console.log(err);
        res.json({
            msg:'Login fail.',
            status:false,
            on:false
        })
    }
} 
evt.addNewUser = async (req,res)=>{
    try {
        console.log(req.body)
        const { name, lastnames, email, phone, password } = req.body;
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
          return res.status(400).json({ status: false, code: 204, msg: 'Ya existe un usuario con esta información', on: false });
        } 
        // Crear usuario
        const newUser = new User({ 
        }); 
        let pass = CryptoJS.AES.encrypt(req.body.password,key.KEY_PASSWORD).toString();
        newUser.name=req.body.name;
        newUser.lastnames=req.body.lastnames;
        newUser.email=req.body.email;
        newUser.phone=req.body.phone;
        newUser.user=req.body.user;
        newUser.active_sessions=false;
        newUser.password=pass;
        newUser.type_user=1;
        const userN = await newUser.save(); 
        if (userN) {
           
          // Configurar nodemailer
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'devfernandorm11@gmail.com',
              pass: 'jviedmytysarykxt',
            },
          });
          // Enviar correo electrónico
          let info = await transporter.sendMail({
            from: 'devfernandorm11@gmail.com',
            to: email,
            subject: 'Activacion de cuenta email✔',
            text: `Hola, tu código de activación es\nCorreo: ${codeEmailGenerate}`,
          });     
          // Generar token y respuesta
          const payload = { check: true };
          const token = jwt.sign(payload, key.KEY_TOKEN, {
            expiresIn: '5m',
          }); 
          const idCodeUser = CryptoJS.AES.encrypt(userN._id.toString(),key.KEY_ID_USER_ENCRYPT).toString();
          const responseData = {
            status: true, 
            msg: 'Successful',
            token: token,
            data: {
              name: userN.name,
              lastnames: userN.lastnames,
              phone: userN.phone,
              email: userN.email,
              photo: userN.photo,
              birtday: userN.birtday, 
            },
            id: idCodeUser, 
          }; console.log('Succesfull')
          res.json(responseData);
        } else {
            
          res.status(500).json({ status: false, code: 203, msg: 'El usuario no se pudo guardar' });
        }
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ status: false, code: 203, msg: 'El usuario no se pudo guardar' });
    } 
}




//PPRUEBAS???
evt.test = async (req,res)=>{
    console.log(req.body)
    res.json({stat:200,msj:'Successful!'})
}
evt.test1 = async (req,res)=>{
    await User.deleteMany()
    res.json({stat:200,msj:'Successful!'})
}







module.exports = evt;