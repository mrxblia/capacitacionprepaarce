const cloudinary = require('cloudinary').v2;
console.log('Cloudinary preparado')
cloudinary.config({
  cloud_name: 'dblg8zkw1',
  api_key: '868181441285431',
  api_secret: '3YC7eZKBs_6a3gGyLgMW68d3LQI'
});

module.exports = cloudinary;