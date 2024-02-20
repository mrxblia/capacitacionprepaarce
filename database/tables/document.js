const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema}=mongoose;
const path=require('path') 
const certifSchema = new Schema({
    name:{
        type:String,
        required:true
    }, 
    lastnames:{
        type:String,
        required:true
    }, 
    id_certification:{
        type:Schema.ObjectId,
        ref:'certification',
        required:true
    }, 
    folio:{
        type:Number,
        required:true
    },
    qr:{
        type:String,
        required:true
    },
    start:{
        type:Date,
        required:true
    }, 
    finish:{
        type:Date,
        required:true
    },  
    status:{
        type:Boolean,
        required:true,
        default:false
    },    
    data_register:{
        type:Date,
        default:Date.now,
        required:true
    }
     
}
); 
module.exports=mongoose.model('document',certifSchema);
