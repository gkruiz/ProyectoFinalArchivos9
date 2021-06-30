import { Component, OnInit } from '@angular/core';
import { NombreServicioService } from '../../servicio/nombre-servicio.service';



@Component({
  selector: 'app-root5',
  templateUrl:'./Paginas/Inicio.html'
})


export class InicioC {
  
  
  uploadedFiles: Array<File>;
  contenido:string="";
  tags:string="";
  imagen:string="-1";


  //variables para mostarar publicaciones
  info:any=[];
  ftag:string="";
  constructor(private servicio:NombreServicioService, private servicio2:NombreServicioService) { }


  muesImagen:string="";

  ngOnInit(): void {
   
    let idUsuario= localStorage.getItem('id');
    let imaU= localStorage.getItem('urlf');
    if(idUsuario&&imaU){
      this.muesImagen="../../../assets/ImgUsuario/"+imaU;
      let contactos=this.servicio2.getPublicaciones(idUsuario).subscribe(
        res => {  
          this.info=res;
          //es un array de arrays 
        }
      );
    }else{
      console.log("No hay una session activa");
    }
  }




  filtroTag(): void {
   
    let idUsuario= localStorage.getItem('id');
    if(idUsuario){
      let contactos=this.servicio2.getPubliTags(idUsuario,this.ftag).subscribe(
        res => {  
          this.info=res;
          //es un array de arrays 
        }
      );
    }else{
      console.log("No hay una session activa");
    }

  }




  
  publicacion() {
    console.log(this.contenido);
    console.log(this.tags);
    console.log(this.imagen);
    
    
    let idsesion=localStorage.getItem('id');

    if(!idsesion){
      console.log("no es igual");
      alert("No hay una session activa");
    }else{

      if(!(this.imagen).localeCompare('1')){
        this.imagen="-1";
        ///sube la imagen
        let formData = new FormData(); 
        formData.append("uploads[]", this.uploadedFiles[0], this.uploadedFiles[0].name);
        this.servicio.upImage(formData).subscribe(
          res => console.log(res)
        );

        ///envia los datos
        this.servicio.publicacionN(idsesion,this.contenido,this.tags, this.uploadedFiles[0].name).subscribe(
          res => {  
            console.log(res);}
        );

      }else{
        alert("No se a cargado ninguna imagen ");
      }

      
    }





  }



  fileChange(element:any) {
    this.uploadedFiles = element.target.files;
    this.imagen="1";
  }


 
}