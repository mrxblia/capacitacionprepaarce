const path = require ('path');     
const session=require('express-session'); 
const fileUpload=require('express-fileupload'); 
const morgan = require('morgan')   
const express = require('express')   
const app = express();    
require('ejs');
const sessions=require('../routes/sessions')   
const certification = require('../routes/document')   
const portal=require('../routes/portal')   
const evaluation=require('../routes/course') 
const validation=require('../routes/validation') 
const signature=require('../routes/signature') 
const profile=require('../routes/profile')   
const pdf=require('../routes/pdf')    
module.exports = app =>{
app.use(morgan('dev'));
//Setings    
app.set('view engine','ejs');  
app.set('views', path.join(__dirname, '../views'));
    //Session   

  // Configuración de express-session
  app.use(session({
    secret: 'dataserviciosfsosite', // Cambia esto a una cadena segura en un entorno de producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Configura secure a true en un entorno de producción con HTTPS
  }));
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
    createParentPath: true, 
})); 
  //Get(get-post) data body
  app.use(express.urlencoded({extended:false}));
  //Get(get-post) data body
  app.use(express.json())  
  //Asignation routes
  sessions(app) 
  certification(app) 
  portal(app) 
  evaluation(app) 
  validation(app) 
  signature(app) 
  pdf(app) 
  profile(app) 
  //Static  
  app.use(express.static(path.join(__dirname,'../public')))
    //Return
    return app;
}