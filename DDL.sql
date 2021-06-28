
--CREATE TABLES 

create table usuario(
id INT  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) primary key  ,
nombre VARCHAR2(255),
usuario VARCHAR2(255),
contrasena VARCHAR2(255),
urlf 	VARCHAR2(255)
);


create table publicacion (
id INT  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) primary key  ,
ruta VARCHAR2(255),
texto VARCHAR2(255),
fecha DATE ,
usuario_id_usuario INT,
constraint fkp foreign key (usuario_id_usuario)
references usuario(id)
);


create table tags (
id INT  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) primary key  ,
nombre VARCHAR2(255)
);



create table tags_publicacion (
publicacion_id_publicacion INT,
publicacion_usuario_id_usuario INT,
tags_id INT,
constraint fktags1 foreign key (publicacion_id_publicacion) references publicacion(id),
constraint fktags2 foreign key (publicacion_usuario_id_usuario) references usuario(id),
constraint fktags3 foreign key (tags_id) references tags(id)
);


create table usuario_contacto (
usuario_id_usuario INT,
usuario_id_amigo INT,
estado INT ,
constraint fkusu1 foreign key (usuario_id_usuario) references usuario(id),
constraint fkusu2 foreign key (usuario_id_amigo) references usuario(id)
);
































