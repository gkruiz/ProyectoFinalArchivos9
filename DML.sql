


--Procedure para registrar




CREATE OR REPLACE PROCEDURE GuardaInfo(
    vnombre IN VARCHAR2 ,
     vusuario IN VARCHAR2 ,
      vcontrasena IN VARCHAR2 ,
       vurlf IN VARCHAR2 
)
IS
BEGIN
  -- get contact based on customer id
    INSERT INTO usuario(nombre,usuario,contrasena,urlf)VALUES(vnombre,vusuario,vcontrasena,vurlf);
END;


CALL GuardaInfo('juan','juanito9','555sdfsd','/nose');









--CONSULTAS PARA EXTRAER INFORMACION DE LA BD O INGRESAR NUEVA 


--Sirve para loguearse 

SELECT * FROM usuario WHERE usuario=:usuario and contrasena=:texencryp



--sirve para actualizar datos del usuario logueado

UPDATE usuario SET nombre=:nombre , usuario=:usuario , urlf=:urlf where id=id




--sirver para registrar la publicacion 
INSERT INTO publicacion(ruta , texto , fecha , usuario_id_usuario)VALUES(:urlf , :contenido ,:fecha , :id)



--Sirver para obtener id publicacion luego de haber sido publicada
SELECT * FROM publicacion WHERE ruta=:urlf and texto=:contenido and usuario_id_usuario=id


-sirve para seleccionar el tag si existiera
SELECT * FROM tags WHERE nombre=:nombre



--sirve para crear el tag que no existe
INSERT INTO tags(nombre)VALUES(:tagT)


--sirve para seleccionar el id del tag creado
SELECT id FROM tags WHERE nombre=:tagT


--sirve para llenar la tabla intermedia tags_publicacion
INSERT INTO tags_publicacion(publicacion_id_publicacion, publicacion_usuario_id_usuario ,tags_id)VALUES(:idPubli,:id,:idtag)




--sirve para confirmar la amistad del usuario1
UPDATE usuario_contacto SET estado=:estado where (usuario_id_usuario=:idusuario and usuario_id_amigo=:idamigo)


--sirve para confirmar la amistad del usuarioi2
UPDATE usuario_contacto SET estado=:estado where (usuario_id_usuario=:idamigo and usuario_id_amigo=:idusuario)


--sirve para enviar solicitud amistad usuario 1
INSERT INTO usuario_contacto(usuario_id_usuario , usuario_id_amigo , estado)VALUES(:idusuario,:idamigo,:estado)


--sirve para enviar solicitud amistad usuario 2
INSERT INTO usuario_contacto(usuario_id_usuario , usuario_id_amigo , estado)VALUES(:idamigo,:idusuario,:estado)




--sirve para obtener el estado actual del usuario 
SELECT estado FROM usuario_contacto WHERE usuario_id_usuario=:id and usuario_id_amigo=:idamigo and estado=2 group by estado


--sirve para obtener a los usuarios que NO son amigos
(SELECT u.id , u.nombre , u.usuario , u.urlf ,0 as estado FROM usuario u WHERE u.id not in (SELECT u.id FROM usuario u , usuario_contacto c WHERE :id=c.usuario_id_usuario and c.usuario_id_amigo=u.id and (c.estado=3 or c.estado=2) GROUP BY u.id ) AND :id!=u.id) UNION (SELECT u.id , u.nombre , u.usuario , u.urlf ,2 as estado FROM usuario u , usuario_contacto c WHERE :id=c.usuario_id_usuario and c.usuario_id_amigo=u.id and c.estado=2 GROUP BY u.id , u.nombre , u.usuario , u.urlf )



--sirve para obtener los amigos del usuario 
select u2.id , u2.nombre , u2.usuario ,u2.urlf ,d.estado from usuario u2 inner join (select c.usuario_id_amigo ,c.estado from usuario u , usuario_contacto c where :id=c.usuario_id_usuario and (c.estado=3)) d on   d.usuario_id_amigo = u2.id   GROUP BY u2.id , u2.nombre , u2.usuario ,u2.urlf ,d.estado    order by u2.id asc


--sirve para obtener las publicaciones del usuario logueado
(SELECT p.id ,u.nombre,u.urlf ,p.texto ,p.ruta ,p.fecha FROM usuario u , usuario_contacto c ,publicacion p WHERE :id=c.usuario_id_usuario and c.usuario_id_amigo=u.id and c.estado=3  and p.usuario_id_usuario=u.id GROUP BY p.id ,u.nombre,u.urlf ,p.texto ,p.ruta ,p.fecha ) UNION (SELECT p.id ,u.nombre,u.urlf ,p.texto ,p.ruta ,p.fecha FROM usuario u ,publicacion p WHERE  p.usuario_id_usuario=:id and p.usuario_id_usuario=u.id GROUP BY p.id ,u.nombre,u.urlf ,p.texto ,p.ruta ,p.fecha )  order by fecha desc



--sirve para obtener las publicaciones con X tags seleccionados
(SELECT p.id ,u.nombre,u.urlf ,p.texto ,p.ruta ,p.fecha,t.nombre FROM usuario u , usuario_contacto c ,publicacion p,tags t,tags_publicacion tg WHERE :id=c.usuario_id_usuario and c.usuario_id_amigo=u.id and c.estado=3 and p.usuario_id_usuario=u.id and u.id=tg.publicacion_usuario_id_usuario and p.id=tg.publicacion_id_publicacion and t.id=tg.tags_id and t.nombre=:tag GROUP BY p.id ,u.nombre,u.urlf ,p.texto ,p.ruta ,p.fecha,t.nombre ) UNION (SELECT p.id ,u.nombre,u.urlf ,p.texto ,p.ruta ,p.fecha,t.nombre FROM usuario u ,publicacion p,tags t,tags_publicacion tg WHERE  p.usuario_id_usuario=:id and p.usuario_id_usuario=u.id and u.id=tg.publicacion_usuario_id_usuario and p.id=tg.publicacion_id_publicacion and t.id=tg.tags_id and t.nombre=:tag GROUP BY p.id ,u.nombre,u.urlf ,p.texto ,p.ruta ,p.fecha,t.nombre ) order by fecha desc
































