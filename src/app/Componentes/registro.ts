import { Component, OnInit } from '@angular/core';
import { NombreServicioService } from '../../servicio/nombre-servicio.service';
//import { FileUploadComponent } from './upfile';


@Component({
  selector: 'app-root6',
  templateUrl:'./Paginas/Registro.html'
})



export class RegistroC {
  
  fileName:string='';
  uploadedFiles: Array<File>;
  
  

  constructor(private servicio:NombreServicioService) { }


  ngOnInit(): void {
   
   //console.log(this.prueba);

  }




  
  getValues(nombre:string,usuario: string, contrasena:string, contrasena2:string) {
    console.log(nombre);
    console.log(usuario);
    console.log(contrasena);
    console.log(contrasena2);
    
    
    

    if(contrasena.localeCompare(contrasena2)){
      console.log("no es igual");
      alert("no es igual");
    }else{

      if((nombre.length>0)&&(usuario.length>0)&&(contrasena.length>0)&&(contrasena2.length>0)){
          ///sube la imagen
          let formData = new FormData(); 
          formData.append("uploads[]", this.uploadedFiles[0], this.uploadedFiles[0].name);
          this.servicio.upImage(formData).subscribe(
            res => console.log(res)
          );

          ///envia los datos
          this.servicio.registraUsuario(nombre,usuario,contrasena, this.uploadedFiles[0].name).subscribe(
            res => {  
              console.log(res);}
          );


          /*this.servicio.getInicio().subscribe(
            res => {  
              this.prueba="jajaja";
              console.log(res);}
          );*/

          console.log("es igual");
          }else{

            alert("Error algun campo esta vacio");
          }


      
    }


  }



  fileChange(element:any) {
    this.uploadedFiles = element.target.files;
  }


 
}


 

