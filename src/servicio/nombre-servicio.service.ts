import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
 


export class NombreServicioService {

  constructor(private  http:HttpClient) {}


  getInicio(){
    return this.http.get('http://localhost:3000/');
  }

///falta la ruta imagen
  registraUsuario(nombre:string,usuario:string,contrasena:string,ruta:string){
    let user = { 
      nombre: nombre,
       usuario: usuario,
       contrasena:contrasena,
       urlf:ruta
    }
    return this.http.post('http://localhost:3000/registro',user);
  }



  Login(usuario:string,contrasena:string){
    let user = { 
       usuario: usuario,
       contrasena:contrasena
    }
    return this.http.post('http://localhost:3000/login',user);
  }


  updateUsuario(id:string,nombre:string,usuario:string,contrasena:string,urlf:string){
    let user = { 
       id:id,
       nombre: nombre,
       usuario: usuario,
       contrasena:contrasena,
       urlf:urlf
    }
    return this.http.post('http://localhost:3000/updUsuario',user);
  }




  publicacionN(id:string,contenido:string,tags:string,urlf:string){
    let user = { 
       id:id,
       contenido: contenido,
       tags: tags,
       urlf:urlf
    }
    ///la fecha se calcula alla
    return this.http.post('http://localhost:3000/publicacionN',user);
  }

  getContactos(id:string){
    ///RETORNA todos los que no son sus amigos
    let user = { 
       id:id
    }
    ///la fecha se calcula alla
    return this.http.post('http://localhost:3000/getContactos',user);
  }


  getAmigos(id:string){
    ///RETORNA todos los que son sus amigos
    let user = { 
       id:id
    }
    ///la fecha se calcula alla
    return this.http.post('http://localhost:3000/getAmigos',user);
  }
  

  getEstado(id:string,idamigo:string){
    ///RETORNA todos los que son sus amigos
    let user = { 
       idusuario:id,
       idamigo:idamigo
    }
    ///la fecha se calcula alla
    return this.http.post('http://localhost:3000/getEstado',user);
  }


  confAmistad(idusuario:string , idamigo:string){
    let user = { 
      idusuario:idusuario,
       idamigo:idamigo
    }
    return this.http.post('http://localhost:3000/confimAmistad',user);
  }



  soliAmistad(idusuario:string,idamigo:string){
    ///RETORNA todos los que no son sus amigos
    console.log(idusuario);
    console.log(idamigo);
    let user = { 
      idusuario:idusuario,
       idamigo:idamigo
    }
    ///la fecha se calcula alla
    return this.http.post('http://localhost:3000/solicitudAmistad',user);
  }




  getPublicaciones(id:string){
    ///RETORNA todos los que son sus amigos
    let user = { 
       id:id
    }
    ///la fecha se calcula alla
    return this.http.post('http://localhost:3000/getPublicaciones',user);
  }



  getPubliTags(id:string,tags:string){
    ///id del usuario session 
    //los tags unidos
    let user = { 
       id:id,
       tags:tags
    }
    ///la fecha se calcula alla
    return this.http.post('http://localhost:3000/getPubliTags',user);
  }



  upImage(imagen:any){
    
    return this.http.post('http://localhost:3000/upImage',imagen);
  }

}





