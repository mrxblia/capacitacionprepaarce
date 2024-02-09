const evt = {};
const {User,Acredit, Document, Signature} = require('../database/tables/index'); 
const CryptoJS=require('crypto-js')   
const key = require('../keys/key');
//Programar phone menssage
evt.my_profile = async (req, res) => {
    try {
       console.log(req.params.id);
       
       let id = CryptoJS.AES.decrypt(req.params.id,key.KEY_ID_USER_ENCRYPT).toString(CryptoJS.enc.Utf8)
    
       console.log(id) 
        const profile = await User.findOne({_id:id});
        
       res.render('profile',{dataCertif:profile})
    } catch (err) {console.log(err)
        res.json({status:false,msg:'Error interno en el servidor'});
    }
} 

module.exports = evt;