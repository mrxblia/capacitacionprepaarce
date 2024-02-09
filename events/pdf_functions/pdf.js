
const PDFDocument = require('pdfkit');
const axios = require('axios'); 
const base64Img = require('base64-img');
const fs = require('fs');
const path = require('path');
async function generateQrImage(base64String, id) { 
    const folderPath = path.join(__dirname, '../../public/images')
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log('Carpeta creada', folderPath);
    } else {
        console.log('Carpeta existente', folderPath);
    }
    return new Promise((resolve, reject) => {
        base64Img.img(base64String, folderPath, id, function(err, filepath) {
            if (err) {
                reject(err);
            } else {
                resolve(filepath);
            }
        });
    });
}

function pdfGenerate(data, dataCallback, endCallback) {
    var doc = new PDFDocument();  // Create a document

    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    // Agregar imagen de fondo
    doc.image(path.join(__dirname, 'plantillas', 'certificado_plantilla1.png'), 0, 0, { width: doc.page.width, height: doc.page.height });

    // Dibujar la elipse directamente en la imagen
    doc.save(); // Guardar el estado actual del contexto
    
    // Agregar la imagen dentro de la elipse
    const imageWidth = 60; // Usar el mismo ancho que la elipse
    const imageHeight = 80; // Usar el mismo alto que la elipse 
 
    doc.save(); // Guardar el estado actual del contexto
    let signature; 
    if(data.id_certification.id_signature ){
        signature=data.id_certification.id_signature.degree + ' ' + data.id_certification.id_signature.name + ' ' + data.id_certification.id_signature.lastnames
    }else{
        signature='Firma'
    }
    // RESTO DE CÓDIGO...
    //...
    doc.moveDown();
    doc.moveDown();
    doc.moveDown(); 
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown(); 
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(20).text(data.name+' '+data.lastnames, { align: 'center' });
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(15).fillColor('black').text(data.id_certification.type + ' de ' + data.id_certification.name, { align: 'center' });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown(); 
    doc.fontSize(12).text(signature);
    doc.fontSize(12).text('Director del Plantel.');

    doc.end();
} 
async function pdfValidation(data, dataCallback, endCallback) {
    
        var doc = new PDFDocument();  // Create a document 

        let signature; 
        if(data.id_certification.id_signature ){
            signature=data.id_certification.id_signature.degree + ' ' + data.id_certification.id_signature.name + ' ' + data.id_certification.id_signature.lastnames
        }else{
            signature='Firma'
        }
        doc.on("data", dataCallback);
        doc.on("end", endCallback);

        // Agregar imagen de fondo
        doc.image(path.join(__dirname, 'plantillas', 'certificado_plantilla1.png'), 0, 0, { width: doc.page.width, height: doc.page.height });
        // Dibujar la elipse directamente en la imagen
        doc.save(); // Guardar el estado actual del contexto 
        let name;;
        if (data.name && data.lastnames) {
            name=data.name+' '+data.lastnames;
        } else {
            name='Sin nombre';
        }
        let desc;
        if (data.id_certification.type && data.id_certification.name) {
            desc= data.id_certification.type + ' de ' + data.id_certification.name;
        } else {
            desc = "S/D";
        }
        let curp;
        if (data.name && data.lastnames) {
            curp=data.folio ;
        } else {
            curp = "S/C";
        }
        //...
        doc.moveDown();
        doc.moveDown();
        doc.moveDown(); 
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown(); 
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.fontSize(20).text(name, { align: 'center' });
        doc.moveDown();
        doc.moveDown();
        doc.fontSize(15).fillColor('black').text(desc,{ align: 'center' });
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.fontSize(12).text(signature);
        doc.fontSize(12).text('Director del Plantel.');
        // Posicionar la nueva imagen más arriba y un poco más grande 
        // Posicionar la nueva imagen más arriba y un poco más grande
        const newImageWidth = 110; // Ajusta según sea necesario
        const newImageHeight = 110; // Ajusta según sea necesario
        const newImageX = doc.page.width - 120 - newImageWidth / 2;
        const newImageY = 640 - newImageHeight / 2; // Ajusta según sea necesario  
        // Descargar la nueva imagen desde la URL 
        
        const qrImageBuffer = Buffer.from(data.qr.replace(/^data:image\/png;base64,/, ''), 'base64');

        // Agregar la nueva imagen en la parte inferior derecha
        doc.image(qrImageBuffer, newImageX, newImageY, { width: newImageWidth, height: newImageHeight }); 
        
    // Calcular las coordenadas para posicionar el texto justo debajo de la imagen
        const textX = newImageX;
        const textY = newImageY + newImageHeight + 10; // Ajusta el espacio entre la imagen y el texto 
        // Agregar el texto
        doc.fillColor('red').text(curp, textX, textY, { align: 'center' });
        doc.moveDown();
        doc.end(); 
    
}

module.exports = { pdfValidation,pdfGenerate };