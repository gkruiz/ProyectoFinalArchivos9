const { Router } = require('express');
const router = Router();
const Database = require('./database');
const Multiparty = require('connect-multiparty');
var fs = require('fs');
const csv = require('csv-parser');
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
var fs = require('fs');




const MultipartyMid = Multiparty({
    uploadDir: '../pro9/src/assets/ImgUsuario'
});







router.get('/', (req,res)=>{
    res.status(200).json({
        status: 200,
        server: 'ON',
        msg: 'Hello World'
    });
});




router.post('/registro', async  (req,res) => {

    const { nombre,usuario,contrasena,urlf } = req.body;
    var encrypted = (CryptoJS.MD5(contrasena));
    var texencryp=encrypted.toString();
    /*var decrypted = CryptoJS.AES.decrypt(encrypted, password);
    console.log(decrypted.toString(CryptoJS.enc.Utf8));*/
    sql = "INSERT INTO usuario(nombre,usuario,contrasena,urlf)VALUES(:nombre,:usuario,:contrasena,:urlf)";
    let result = await Database.Connection(sql, [nombre,usuario,texencryp,urlf], true);
    res.json(texencryp);
    
});






router.post('/login', async  (req,res) => {


    const { usuario , contrasena } = req.body;
    var encrypted = (CryptoJS.MD5(contrasena));
    var texencryp=encrypted.toString();
    sql = "SELECT * FROM usuario WHERE usuario=:usuario and contrasena=:texencryp";
    let result = await Database.Connection(sql, [usuario,texencryp], true);
    
    Usuario = [];

    result.rows.map(usu => {
        let lusu = {
            "id": usu[0],
            "nombre": usu[1],
            "usuario": usu[2],
            "contrasena": usu[3],
            "urlf": usu[4]
        }
        Usuario.push(lusu);
    })

    var retorna= {
        "id": "-1",
        "nombre": "-1",
        "usuario": "-1",
        "contrasena":"-1",
        "urlf": "-1"
    }

    //retorna la info del usuario
    if(Usuario.length==1){
        retorna=Usuario[0];
        retorna[2]=contrasena;
    }


    res.json(retorna);
    
});



router.post('/upImage', MultipartyMid,  (req,res) => {

    fs.rename(req.files.uploads[0].path, '../pro9/src/assets/ImgUsuario/'+req.files.uploads[0].name, function(err) {
        if(err) console.log('ERROR: ' + err);
    });
    console.log('Archivo Subido');
});




router.post('/updUsuario', async  (req,res) => {

    const { id, nombre,usuario,contrasena,urlf } = req.body;
    ///la contrasena ya esta encriptada 
    
    sql = " UPDATE usuario SET nombre=:nombre , usuario=:usuario , urlf=:urlf where id="+id;
    console.log(sql);
    let result = await Database.Connection(sql, [nombre,usuario,urlf], true);
    res.json("ok");
    
});





module.exports = router;
