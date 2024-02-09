const express = require('express')
const config = require('./server/config')
 
const http = require('http');  
//DataBase
require('./database/conection')
//Iniciando el servidor
const app = config(express());
const httpServer = http.createServer(app); 
const port=process.env.port||80;
httpServer.listen(port,()=>{
    console.log("Servidor en el puerto " + port);
})