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



//con procedure
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





//con procedure
router.post('/login', async  (req,res) => {


    const { usuario , contrasena } = req.body;
    var encrypted = (CryptoJS.MD5(contrasena));
    var texencryp=encrypted.toString();
    sql = "SELECT * FROM usuario WHERE usuario=:usuario and contrasena=:texencryp";
    let result = await Database.Connection(sql, [usuario,texencryp], false);
    
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



router.post('/publicacionN', async  (req,res) => {

    const { id, contenido ,tags , urlf } = req.body;
    ///la fecha se calcula aqui
    //se separan los tags
    //se llena la tabla intemedia
    var d = new Date();
   
    console.log(d);

    sql = " INSERT INTO publicacion(ruta , texto , fecha , usuario_id_usuario)VALUES(:urlf , :contenido ,:fecha , :id) ";
    //console.log(sql);
    let result = await Database.Connection(sql, [urlf,contenido,d,id], true);
    ///Luego de guardar publicacion obtener su ID
    sql = "SELECT * FROM publicacion WHERE ruta=:urlf and texto=:contenido and usuario_id_usuario="+id;
    result = await Database.Connection(sql, [urlf,contenido], false);
    //console.log("no error 0");
    Inicio = [];
    result.rows.map(ini => {
        //console.log(ini[0]);
        let IniSchema = {"id":ini[0]}
        Inicio.push(IniSchema);
    })

    var idPubli="-1";
    idPubli=(Inicio[0])['id'];


    //console.log("no error 1");

    //separa y guarda los tags
    var tagSeparado=tags.split(",")
    //console.log("no error 2");
    //busca cada uno y si no existe lo guarda
    for(var i=0;i<tagSeparado.length;i++){
        sql = "SELECT * FROM tags WHERE nombre=:nombre";
        var tagT=tagSeparado[i];
        result = await Database.Connection(sql, [tagT], false);
        //console.log("no error 3");
        Inicio = [];
        result.rows.map(ini => {
            let IniSchema = {"id":ini[0]}
            Inicio.push(IniSchema);
        })
        //console.log("no error 4");
        var idtag="";
        //si no se ha creado el tag lo crea
        if(Inicio.length==0){
            sql = " INSERT INTO tags(nombre)VALUES(:tagT)";
            result = await Database.Connection(sql, [tagT], true);
            //console.log("no error 5");
            //Luego obtiene su id para enlazar
            sql = " SELECT id FROM tags WHERE nombre=:tagT";
            result = await Database.Connection(sql, [tagT], false);
            //console.log("no error 5");
            Inicio2 = [];
            result.rows.map(ini => {
                console.log(ini[0]);
                let IniSchema = {"id":ini[0]}
                Inicio2.push(IniSchema);
            })
            //console.log("no error 6");
            //guarda el id tag recien creado
            console.log(Inicio2);
            console.log((Inicio2[0])['id']);
            console.log(Inicio2['id']);
            idtag=(Inicio2[0])['id'];
            
            //console.log("no error 7");
        }else{
        //si ya existe entonces hace la vinculacion
            idtag=(Inicio[0])['id'];
            console.log((Inicio[0])['id']);
            //console.log("no error 8");
        }

        //ya que creo el tag si no existe o lo encontro entonces llena la tabla intermedia
        //publicacion_id_publicacion INT,
        //publicacion_usuario_id_usuario INT,
        //tags_id INT,
        sql = " INSERT INTO tags_publicacion(publicacion_id_publicacion, publicacion_usuario_id_usuario ,tags_id)VALUES(:idPubli,:id,:idtag)";
       // console.log(sql);
        result = await Database.Connection(sql, [idPubli,id,idtag], true);


    }//fin for



    res.json("ok");
    
});








router.post('/confimAmistad', async  (req,res) => {

    const { idusuario,idamigo } = req.body;
    
    sql = " UPDATE usuario_contacto SET estado=:estado where (usuario_id_usuario=:idusuario and usuario_id_amigo=:idamigo)";;
    let result = await Database.Connection(sql, ["3",idusuario,idamigo], true);

    sql = " UPDATE usuario_contacto SET estado=:estado where (usuario_id_usuario=:idamigo and usuario_id_amigo=:idusuario)";;
    result = await Database.Connection(sql, ["3",idamigo,idusuario], true);
    res.json("ok");
    
});




router.post('/solicitudAmistad', async  (req,res) => {
    const { idusuario,idamigo } = req.body;
    console.log(idusuario);
    sql = "INSERT INTO usuario_contacto(usuario_id_usuario , usuario_id_amigo , estado)VALUES(:idusuario,:idamigo,:estado)";
    let result = await Database.Connection(sql, [idusuario,idamigo,"1"], true);

    sql = "INSERT INTO usuario_contacto(usuario_id_usuario , usuario_id_amigo , estado)VALUES(:idamigo,:idusuario,:estado)";
    result = await Database.Connection(sql, [idamigo,idusuario,"2"], true);

    res.json("ok");
    
});


router.post('/getEstado', async  (req,res) => {
    const { idusuario,idamigo } = req.body;
    console.log(idusuario);
    sql = "SELECT estado FROM usuario_contacto WHERE usuario_id_usuario=:id and usuario_id_amigo=:idamigo and estado=2 group by estado";
    let result = await Database.Connection(sql, [idusuario,idamigo], false);

    res.json(result);
    
});




router.post('/getContactos', async  (req,res) => {


    const { id } = req.body;

    sql = "(SELECT u.id , u.nombre , u.usuario , u.urlf ,0 as estado FROM usuario u WHERE u.id not in (SELECT u.id FROM usuario u , usuario_contacto c WHERE :id=c.usuario_id_usuario and c.usuario_id_amigo=u.id and (c.estado=3 or c.estado=2) GROUP BY u.id ) AND :id!=u.id) UNION (SELECT u.id , u.nombre , u.usuario , u.urlf ,2 as estado FROM usuario u , usuario_contacto c WHERE :id=c.usuario_id_usuario and c.usuario_id_amigo=u.id and c.estado=2 GROUP BY u.id , u.nombre , u.usuario , u.urlf )";
    let result = await Database.Connection(sql, [id], false);
    
    Usuario = [];

    result.rows.map(usu => {
        let lusu = {
            "id": usu[0],
            "nombre": usu[1],
            "usuario": usu[2],
            "urlf": usu[3],
            "estado": usu[4]
        }
        Usuario.push(lusu);
    })

    res.json(Usuario);
    
});








router.post('/getAmigos', async  (req,res) => {


    const { id } = req.body;

    sql = "select u2.id , u2.nombre , u2.usuario ,u2.urlf ,d.estado from usuario u2 inner join (select c.usuario_id_amigo ,c.estado from usuario u , usuario_contacto c where :id=c.usuario_id_usuario and (c.estado=3)) d on   d.usuario_id_amigo = u2.id   GROUP BY u2.id , u2.nombre , u2.usuario ,u2.urlf ,d.estado    order by u2.id asc";
    let result = await Database.Connection(sql, [id], false);
    
    Usuario = [];

    result.rows.map(usu => {
        let lusu = {
            "id": usu[0],
            "nombre": usu[1],
            "usuario": usu[2],
            "urlf": usu[3]
        }
        Usuario.push(lusu);
    })

    res.json(Usuario);
    
});









module.exports = router;
