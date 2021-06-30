import { Component } from '@angular/core';
import { NombreServicioService } from '../../servicio/nombre-servicio.service';

import { HomeComponent } from './redirect';

@Component({
  selector: 'app-root5',
  templateUrl:'./Paginas/Login.html'
})


export class LoginC {
  
  usuario:string='';
  contrasena:string='';
  existe:any=[];
  
  constructor(private servicio:NombreServicioService,private redire:HomeComponent ) { }


  ngOnInit(): void {
    localStorage.clear();
  }

  
  loginfun() {

      console.log(this.usuario);
      console.log(this.contrasena);


      

      if((this.usuario.length>0)&&(this.contrasena.length>0) ){
        console.log("valores NO vacios");
        this.servicio.Login(this.usuario, this.contrasena).subscribe(
          res => {  
            
            this.existe=res;
            var id=(this.existe['id']);
            var nombre=(this.existe['nombre']);
            var usuario=(this.existe['usuario']);
            var contrasena=(this.existe['contrasena']);
            var urlf=(this.existe['urlf']);

            
            if((id)!=-1){
              console.log("todo bien");
              localStorage.setItem('id', id);
              localStorage.setItem('nombre', nombre);
              localStorage.setItem('usuario', usuario);
              localStorage.setItem('contrasena', contrasena);
              localStorage.setItem('urlf', urlf);

              console.log(id);
              console.log(nombre);
              console.log(usuario);
              console.log(contrasena);
              console.log(urlf);

              this.redire.onSelect("/inicio");


            }else{
              alert("usuario o contrasena incorrectos");

            }
            
          }
        );
        
        ///aqui valida la info que viene del logueo 
        //const { id, nombre , usuario , contrasena ,urlf } = existe;
        /*if(idt!="-1"){

        }*/
        

      }else{
        alert("Usuario o Contrasena Erroneo");
      }


  }
  
 
}
