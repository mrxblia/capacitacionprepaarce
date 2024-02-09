const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema}=mongoose;
const path=require('path') 
const userSchema = new Schema({ 
    name:{
        type:String,
        required:true
    }, 
    lastnames:{
        type:String,
        required:true
    },    
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    user:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },   
    phone:{
        type:Number,
        required:true
    }, 
    status:{
        type:Boolean,
        required:true,
        default:false
    },   
    type_user:{
        type:Number,
        required:true, 
    }, 
    data_register:{
        type:Date,
        default:Date.now,
        required:true
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    }, 
    active_sessions:{
        type:Boolean,
        required:true, 
    },  
     
}
); 
module.exports=mongoose.model('user',userSchema);
