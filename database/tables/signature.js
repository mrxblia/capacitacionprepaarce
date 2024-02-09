const mongoose = require('mongoose');
const { Schema } = mongoose;

const signatureSchema = new Schema({
    id_add_user: {
        type: Schema.Types.ObjectId,
        ref: 'user', 
        required: false
    }, 
    public_id:{
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    }, 
    lastnames: {
        type: String,
        required: true
    }, 
    degree: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },  
    image: {
        type: String,
        required: false
    }, 
    status:{
        type:Boolean,
        required:true,
        default:false
    },   
    data_register: {
        type: Date,
        default: Date.now,
        required: true
    }
}); 

module.exports = mongoose.model('signature', signatureSchema);
