const key = require('../keys/key');
const jwt = require('jsonwebtoken');
function generarToken(usuario) {
    return jwt.sign({ usuario }, key.KEY_TOKEN, { expiresIn: '1h' });
}
function verificarToken(token) {
    return jwt.verify(token, secretKey);
}
  
function encriptarContrasena(contrasena) {
    return bcrypt.hash(contrasena, 10);
}
  
function compararContrasena(contrasena, contrasenaEncriptada) {
    return bcrypt.compare(contrasena, contrasenaEncriptada);
}
  
module.exports = {
    generarToken,
    verificarToken,
    encriptarContrasena,
    compararContrasena
};