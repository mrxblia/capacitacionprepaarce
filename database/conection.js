const mongoose = require('mongoose');
const { database }=require('../database/key.js')
mongoose.connect(database.URI) 
.then((db)=>{
    console.log('\nEsta conectado con la BD '+database.URI)
})
.catch((err)=>{
    console.log('\nEste es un error \n')
    console.log('====================')
    console.log(err)
    console.log('====================')
})