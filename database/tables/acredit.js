const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema}=mongoose;
const path=require('path') 
const certifSchema = new Schema({
    name:{
        type:String,
        required:true
    }, 
    description:{
        type:String,
        required:true
    }, 
    details:{
        type:String,
        required:true
    }, 
    type:{
        type:String,
        required:true
    },
    hours:{
        type:Number,
        required:true
    }, 
    id_signature: {
        type: Schema.ObjectId,
        ref: 'signature',
        required: function () {
            return this.signature_type == 'Firma digital'||this.signature_type=='Para firmar';
        }
    }, 
    signature_type:{
        type:String,
        required:true,
        enum: ['Firma digital', 'Para firmar', 'Sin firmar']
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
module.exports=mongoose.model('certification',certifSchema);
