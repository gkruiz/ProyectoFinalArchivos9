import { Component, OnInit } from '@angular/core';
import { NombreServicioService } from '../../servicio/nombre-servicio.service';



@Component({
  selector: 'app-root20',
  templateUrl:'./Paginas/Amigos.html'
})


export class amigosC {
  
  

  ListaUsuario: Array<any> = [];
  info:any=[];

  //id:string="";
  estado:string="";


  constructor(private servicio:NombreServicioService) { }

  muesImagen:string="";
  ngOnInit(): void {
    

    let idUsuario= localStorage.getItem('id');
    let imaU= localStorage.getItem('urlf');
    if(idUsuario&&imaU){
      this.muesImagen="../../../assets/ImgUsuario/"+imaU;
      let contactos=this.servicio.getAmigos(idUsuario).subscribe(
        res => {  
          this.info=res;
          //es un array de arrays 

        }
      );
    }else{
      console.log("No hay una session activa");
    }
    
    
    /*let valores={
      "nombre":"kevin",
      "id":"10",
      "urlf":"/555"
    };

    this.ListaUsuario.push(valores);
    this.ListaUsuario.push(valores);*/
  
  }




  
  publicacion(id:string,estado:string) {
    console.log(id);
    console.log(estado);
    

    if(estado.length>0){
      console.log("as1");
      //entonces tenia invitacion de amistad
      // usuario_actual   2
      // amigo_solicitud  1
      //  id  ida 2
      //  ida id  1
      //actualiza el registro
      let idUsuario= localStorage.getItem('id');
        if(idUsuario){
          console.log("sesion activa1");
          this.servicio.confAmistad(idUsuario,id);
        }else{
          console.log("No hay sesion activa1");
        }
        
          

    }else{
      console.log("as2");
      //no eran amigos
      //envia la solicitud de amistad
      //crea ambos registros
      let idUsuario= localStorage.getItem('id');
      if(idUsuario){
        console.log("sesion activa");
        this.servicio.soliAmistad(idUsuario,id);
        console.log("sesion sale");
      }else{
        console.log("No hay sesion activa");
      }

    }


  }




 
}