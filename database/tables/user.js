const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema}=mongoose;
const path=require('path') 
const rolesValidos = ['Root', 'Administrator', 'Operaciones', 'Profesor', 'Alumno', 'Padre/Madre/Tutor'];
const esRolValido = (rol) => {
    return rolesValidos.includes(rol);
};
const userSchema = new Schema({ 
    name:{
        type:String,
        required:true
    }, 
    lastnames:{
        type:String,
        required:true
    },
    birtday:{
        type:Date,
        required:true
    },    
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    rol: {
        type: String,
        required: true, 
        validate: {
            validator: esRolValido,
            message: props => `${props.value} no es un rol válido`
        }
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
    restored:{
        type:Boolean,
        required:true,
        default:true
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
    }, 
     
}); 
module.exports=mongoose.model('user',userSchema);
