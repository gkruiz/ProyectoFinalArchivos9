import { Component, OnInit } from '@angular/core';
import { NombreServicioService } from '../../servicio/nombre-servicio.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root20',
  templateUrl:'./Paginas/Agregar.html'
})


export class agregarA {
  
  

  ListaUsuario: Array<any> = [];
  info:any=[];

  //id:string="";
  //estado:string="";


  constructor(private servicio:NombreServicioService,private servicio2:NombreServicioService,private servicio3:NombreServicioService) { }

  muesImagen:string="";

  ngOnInit(): void {
    

    let idUsuario= localStorage.getItem('id');
    let imaU= localStorage.getItem('urlf');
    if(idUsuario&&imaU){
      this.muesImagen="../../../assets/ImgUsuario/"+imaU;
      let contactos=this.servicio.getContactos(idUsuario).subscribe(
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



  est:string='2';
  
  publicacion(id:string,estado:string) {
    console.log(id);
    

    let idUsuario= localStorage.getItem('id');
    let estadot='2';

    console.log(estado);
    //if(this.info.length==0){

      console.log(estado.localeCompare("2"));


      
    if(!estado.localeCompare("2")){
      console.log("as1");
      //entonces tenia invitacion de amistad
      // usuario_actual   2
      // amigo_solicitud  1
      //  id  ida 2
      //  ida id  1
      //actualiza el registro
      
        if(idUsuario){
          console.log("sesion activa1");
          this.servicio2.confAmistad(idUsuario,id).subscribe(
            res => {  
            }
          );
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
        this.servicio2.soliAmistad(idUsuario,id).subscribe(
          res => {  
          }
        );
        console.log("sesion sale");
      }else{
        console.log("No hay sesion activa");
      }

    }
    
    


  }




 
}