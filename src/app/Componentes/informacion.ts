import { Component, OnInit } from '@angular/core';
import { NombreServicioService } from '../../servicio/nombre-servicio.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-root5',
  templateUrl:'./Paginas/Informacion.html'
})


export class InformacionC implements OnInit {
  title = 'pro92';

  cargo:string='-1';
  uploadedFiles: Array<File>;
  base:string='../../../assets/ImgUsuario/';
  nombre:string='';
  usuario:string='';
  ruta:string='';

  contrasena:string='';
  chat:string='';


  constructor(private servicio:NombreServicioService) { }

  muesImagen:string="";
  ngOnInit(): void {

    let imaU= localStorage.getItem('urlf');
    if(imaU){
      this.muesImagen="../../../assets/ImgUsuario/"+imaU;
    }


    //var base='../../../assets/ImgUsuario/';
    var nombre = localStorage.getItem('nombre');
    let usuario = localStorage.getItem('usuario');
    let ruta = localStorage.getItem('urlf');
    if(nombre&&usuario &&ruta){
      this.nombre=nombre;
      this.usuario=usuario;
      this.ruta=this.base+ruta;
    }
  }





  acualizaInfo(){

      ///valida que los campos a cambiar esten llenos todos 
      let contrat = localStorage.getItem('contrasena');

      if((this.nombre.length>0)&&(this.usuario.length>0)&&(this.contrasena.length>0)&&(contrat)){
        console.log("valores NO vacios");
        const md5 = new Md5();
        var temp=(md5.appendStr(this.contrasena).end()).toString();
        console.log(temp);
        console.log(contrat);



        
        ///luego valida que la contrasena sea igual
        if(temp.localeCompare(contrat)){
          console.log("no es igual");
          alert("la contrasena ingresada es erronea");
        }else{
          let idr = localStorage.getItem('id');
          //valida que exista la sescion guardada
          if(idr){
            
            //empieza para acutalizar los datos
              if(!this.cargo.localeCompare('1')){
                
                console.log("cambio la imagen");
                ///sube la imagen
                let formData = new FormData(); 
                formData.append("uploads[]", this.uploadedFiles[0], this.uploadedFiles[0].name);
                this.servicio.upImage(formData).subscribe(
                  res => console.log(res)
                );
                ///envia los datos , imagen se cambio
                //actualiza info navegadro
                  localStorage.setItem('nombre', this.nombre);
                  localStorage.setItem('usuario', this.usuario);
                  localStorage.setItem('urlf', this.uploadedFiles[0].name);
                this.servicio.updateUsuario(idr,this.nombre,this.usuario,contrat,this.uploadedFiles[0].name).subscribe(
                  res => {  
                    console.log(res);}
                );
                this.cargo='-1';
              }else{
                console.log("conservo la imagen");
                ///envia los datos , imagen no se cambio
                let urlm = localStorage.getItem('urlf');
                if(urlm){
                  //actualiza info navegador
                  localStorage.setItem('nombre', this.nombre);
                  localStorage.setItem('usuario', this.usuario);
                  localStorage.setItem('urlf', urlm);
                  this.servicio.updateUsuario(idr,this.nombre,this.usuario,contrat,urlm).subscribe(
                    res => {  
                      console.log(res);}
                  );
                }
                
              }
          }else{
            alert("No existe una sesion");
          }
          
          
          

    
          console.log("es igual");
          
        }
        


        

      }else{
        alert("Algun campo es Erroneo");
      }




  }








  fileChange(element:any) {
    this.uploadedFiles = element.target.files;
    this.cargo='1';
  }



}
