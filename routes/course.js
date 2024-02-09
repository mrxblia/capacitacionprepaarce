const express = require('express');
const route  = express.Router();    
const ev = require('../events/course')
const upload = require("../server/multer_middelware");
const CryptoJS=require('crypto-js') 
const key = require('../keys/key');
module.exports = app=>{  
    //REGISTRO SERVER DB (MICROSERVICE)
    route.post('/courses/register_new',ev.course_add_new)
    route.post('/diplomates/register_new',ev.diplomate_add_new) 
    route.get('/course/status_up/:id/:rt',ev.status_up)
    route.get('/course/status_down/:id/:rt',ev.status_down)
    route.get('/course/delete/:id/:rt',ev.delete) 
    route.post('/certifications/register_new',ev.certification_add_new)
    route.get('/certification/status_up/:id',ev.status_up)
    route.get('/certification/status_down/:id',ev.status_down)
    route.get('/certifications/delete/:id/:rt',ev.delete) 
    route.get('/diplomate/status_up/:id/:rt',ev.status_up)
    route.get('/diplomate/status_down/:id/:rt',ev.status_down)
    route.get('/diplomate/delete/:id/:rt',ev.delete) 
    app.use('/',route)
};