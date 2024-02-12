const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema}=mongoose;
const path=require('path') 
const auth_tokenSchema = new Schema({
    id_user:{
        type:String,
        required:true
    }, 
    token:{
        type:String,
        required:true
    },  
    authenticated:{
        type:Boolean,
        required:true
    },   
    data_register:{
        type:Date,
        default:Date.now,
        required:true
    }
     
}
); 
module.exports=mongoose.model('auth_token',auth_tokenSchema);
