# Proyecto 2
## Manejo e implmentacion de archivos
Kevin Golwer Enrique Ruiz Barbales
Carne: 201603009

#### Introduccion
 El proyecto esta pensado para registrar usuario y permitir que estos puedan enviar solicitudes de amistad a otros , ademas que les permita el comunicarse via mensaje hecho con sockets , tambien que los usuarios puedan hacer todo tipo de publicaciones y que estas puedan ser visibles para otros usuario que sean sus amigos , estas publicaciones pueden o no tener lo que son tags , dependiendo de estos , se podran hacer busquedas en donde se filtren solo las publicaciones que les correspondan esos tags , los usuario podran visualizar sus amigos y tambien a las personas que no sean sus amigos , ademas podran ver su informacion y tener la opcion de modificar sus datos cuando asi lo deseen, en la parte principal podran visualizar todas las publicaciones , al finalizar , podran cerrar sesion e ingresar cuando deseen despues.

#### Lenguajes Utilizados
Typescript (frontend)
Javascript (backend)
SQL Oracle (Database)
#### Frameworks usados
Angular
NodeJs
#### Arquitectura Usada
![N|Solid](https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.sbperu.net%2Fwp-content%2Fuploads%2F2018%2F09%2Fls-icon-01.jpg&f=1&nofb=1) 

El proyecto esta dividido en 3 partes:
-   el frontend en Angular
-   el backend en Nodejs
-   y la base de datos en Oracle 

para el caso de angular se uso la version  12.0.5 :
Angular CLI: 12.0.5
Node: 14.17.1
Package Manager: npm 6.14.13
OS: win32 x64


Para el caso de NodeJs se uso la version v14.17.1

Para el caso de la base de datos se uso Oracle la version 19c


##### Esta es la arquitectura planteada:

![N|Solid](https://raw.githubusercontent.com/gkruiz/ProyectoFinalArchivos9/main/ImagenesMD/estructura.JPG?token=AF6K35ZDNOYH6AHCHNSIZ2TA3GDEY) 


Todo el proyecto corre bajo el Sistema Operativo Windows 10 X64

## Diagrama Entidad Relacion :

![Build Status](https://raw.githubusercontent.com/gkruiz/ProyectoFinalArchivos9/main/ImagenesMD/diagrama9.png?token=AF6K355HN7ZWZ7ZHX24IFSTA3GD2Yr)


#### Se uso un total de 6 tablas las cuales son :
- tags
- tags_publicacion
- publicacion
- usuario
- mensaje
- usuario_contacto


#### Descripcion de las Tablas:

#####  tags:
la tabla tags sirve para guardar todos los tags que se le asignen a una publicacion,
esta solo guarda el nombre y genera un id propio , 
esta tabla se usara luego para poder relacionar los tags con las publicaciones correspondientes.

##### tags_publicacion:
esta tabla sirve para romper la relacion entre la tabla "publicacion" y la tabla "tags" , esta guarda el id de la tabla "tags" , el id de la "publicacion" y por ultimo el id del usuari que la genero, no posee ningun id propio.


##### publicacion:
esta tabla contiene la informacion de las publicaciones que haga un usuario registrado, contiene los campos "texto" que es el contenido de la publicacion, 
la ruta de la imagen que se use para publicar , la fecha para poder ordenar las publicaciones , y por ultimo la llave foranea id_usuario, esta guarda el id del usuario que genero la publicacion.


##### usuario:
esta tabla se puede decir que es una de las mas importantes pues guarda los usuarios que se registran en el sistema, tiene los siguientes campos: nombre que es el nombre del usuario , usuario que seria el identificador para poderse loguear , contrasena y el campo "urlf" que es donde guarda la ruta de la imagen de perfil que usara.



##### mensaje:
en esta tabla se guardara lo que son los mensajes que generara el usuario con otros usuario , tiene los siguientes campos , el id del usuario que envia el mensaje y el id del usuario que recibe el mensaje , ademas del campo texto que vendria a ser el contenido del mensaje.

##### usuario_contacto:
esta tabla nos sirve para guardar las amistades que tiene registrado un usuario , este puede tener multiples amistades , y a su ves esa amistades pueden tener otras amistads iguales o diferentes , tiene los siguientes campos : idusuario que es el dueno de los usuario , idamigo que es el amigo del usuario , y por ultimo el valor estado que este dice si son o no amigos , si es valor 3 es amigo , si es 2 le enviaron una solicitud de amistad, y si es 1 el fue el que envio la solicitud de amistad y por ultimo el valor 0 que indica que no son amigos.

#### Relaciones entre Tablas:

empezamos teniendo la de usuario_contacto que esta se genera porque un usuario puede tener muchos amigos (usuarios) , y estos a su ves pueden tener como amigos a el y a otros amigos iguales al usuario , entonces se genera la relacion de muchos a muchos , y para romperla se usa esta tabla donde hereda dos id de usuario y un estado 

la siguente es la relacion de mensaje y usuario , un usuari puede tener muchos mensajes , este le puede enviar mensaje a muchos amigos , y estos a su ves le pueden enviar muchos mensajes ,entonces se vuelve a generar una relacion de muchos a muchos , para romperla se hace la tabla mensaje y recibe los dos id del los usuario y por ultimo el valor del mensaje


luego tenemos la relacion de usuario y publicacion , usuario puede generar multiples publicaciones pero esa publicacion solo le pertenecera a el quien seria el autor , si otro usuario quisiera ver esa publicacion tendria que ser su amigo , para poder acceder a sus publicaciones

luego tenemos la relacion de publicacion a tags_publicacion esta es una relacion en donde una publicacion puede tener muchos "tags" pero estos tags tambien le pueden pertenecer a otros usuario , entonces se genera una relacion de muchos a muchos , ser rompe la relacion y luego se crea esta relacion con la tabla intermedia



por ultimo tenemos la relacion de la tabla intermedia tag_publicacion y la tabla tags , esta relacion une esta tabla y le hereda su id para para que una publicacion pueda tener muchos tags y estos le puedan pertenecer a otras publicaciones


#### Descripcion de los EndPoints en NodeJS

Tenemos los siguientes endpoints :

ENDPOINT("/"):
Este sirve para mostrar un mensaje que el servidor esta bien , retorna un mensaje 
status 200 y retorna un mensaje "hola mundo"

ENDPOINT("/registro"):
Este sive para registrar un nuevo usuario en el sistema , recibe como parametros el nombre , usuario , contrasena y la ruta de la imagen que usara,
no retorna nada mas que la contrasena codificada en md5

ENDPOINT("/login"):
Este sirve para poder loguearse en el sistema , recibe como parametro el usuario y la contrasena sin codificar en md5 , si el usuario existe retorna su informacion , nombre , usuario , urlf ,contrasena , para poder guardarla en el navegador y usarla despues

ENDPOINT("/upImage"):
Este sirve para subir la imagen al servidor , recibe el archivo binario y luego lo convierte y lo guarda en el servidor como una imagen , solamente retorna un mensaje que dice que se subio el archivo



ENDPOINT("/updUsuario"):
este recibe como parametros el id, nombre , usuario , contrasena, y urlf 
se encarga de actualizar los datos del usuario que esta logueado , si todo sale bien , envia un mensaje de OK al servidor



ENDPOINT("/publicacionN"):
este recibe como parametro id, contenido, tags y urlf, se encarga de guardar una nueva publicacion , ademas de guardar los correspondientes tag que se usaron , 
si un tag existe solo obtenen su id , pero si no existiera lo crea y obtiene su id,
si todo sale bien retorna un mensaje OK al servidor


ENDPOINT("/confimAmistad"):
Este recibe como parametro el id del usuario logueado y del amigo quien le envio la solicitud de amistad, cambia el valor de la base de datos en 1 y 2 a 3 que significaria que ahora es su amigo, si todo sale bien , retorna un mensaje de OK al servidor


ENDPOINT("/solicitudAmistad"):
Este recibe como parametros id usuario que seria el que esta logueado y el id amigo que seria a la persona a quien le esta enviando la solicitud de amistad, se encarga de generar y guardar la nueva solicitud de amistad, de momento queda en espera hasta que el otro usario la acepte , si todo sale bien , retorna un mensaje de OK al servidor

ENDPOINT("/getEstado"):
Este recibe como parametros id usuario que seria el que esta logueado y el id amigo a quien le desea enviar solicitud de amistad o algun otro proceso , luego se encarga de buscar el estado actual del usuario , al final retorna el registro donde guarda la informacion del usuario para ser usada despues

ENDPOINT("/getContactos"):
Este recibe como parametros el id del usuario que esta logueado , se encarga de buscar a todos los usuarios que estan registrados y que NO son amigos del usuario para que este pueda enviarles solicitud o que el les acepte la solicitud, al final si todo sale bien retorna a todos los usuario con su respectiva informacion exceptuando la contrasena



ENDPOINT("/getAmigos"):
Este recibe como parametros el id del usuario que esta logueado , y se encarga de seleccionar a todos los usuarios que son amigos del usuario logueado , selecciona su informacion primordial exceptuando la contrasena , si todo sale bien entonces retornaria toda esa informacion al servidor



ENDPOINT("/getPublicaciones"):
este recibe como parametros el id del usuario que esta logueado , se encarga de seleccionar todas las publicaciones que el usuario tiene el permiso de ver , seria solo sus publicaciones y las de sus amigos correspondientes,si todo sale bien retorna las pubicaciones de el y sus amigos


ENDPOINT("/getPubliTags"):
Este recibe como parametro el id y los tag que desea seleccionar las publicaciones, se encarga de buscar todas las publicaciones que contengan esos tag , ademas de validar que estas publicaciones son de sus amigos , ya que no tiene permiso de ver las publicaciones que no sean de el o de sus amigos, si todo sale bien retorna todas esas publicaciones y sus respectivos tags asignados



#### Descripcion del Store Procedure

##### Store Procedure Registro
>
>
>CREATE OR REPLACE PROCEDURE GuardaInfo(
    vnombre IN VARCHAR2 ,
    vusuario IN VARCHAR2 ,
    vcontrasena IN VARCHAR2 ,
    vurlf IN VARCHAR2 
)
IS
BEGIN
    INSERT INTO usuario(nombre , usuario , contrasena , urlf )VALUES(vnombre , vusuario , vcontrasena , vurlf);
END;


####  Este store procedure , se encarga de hacer el registro de un usuario nuevo, recibe como parametros:
##### vnombre: 
que es el nombre del usuario 
##### vusuario: 
que es el usuario 
##### vcontrasena : 
su respectiva contrasena
##### vurlf:
la ruta de la imagen que usara

Luego hace el insert sobre la tabla USUARIO , y le pasa sus parametros , por ultimo finaliza el procedure y termina la transaccion.



#### Instancia de Oracle Instalada

![Build Status](https://raw.githubusercontent.com/gkruiz/ProyectoFinalArchivos9/main/ImagenesMD/cmd2.JPG?token=AF6K3555KOKNLYBINMCRK3DA3GL34)


#### Instancia de Oracle Abierta en SQL Developer 

![Build Status](https://raw.githubusercontent.com/gkruiz/ProyectoFinalArchivos9/main/ImagenesMD/conexion9.JPG?token=AF6K353UL3RFJI2LVE7DS53A3GMBU)
















