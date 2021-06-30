import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { Principal } from './Componentes/Principal';
import { LoginC  } from './Componentes/login';
import { RegistroC ,} from './Componentes/registro';
import { InformacionC } from './Componentes/informacion';
import { InicioC } from './Componentes/inicio';
import { agregarA } from './Componentes/agregar';
import { amigosC } from './Componentes/amigos';
//para los sockets
import { DocumentListComponent } from './Componentes/document-list.component';
import { DocumentComponent } from './Componentes/document.component';



const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    Principal , LoginC ,RegistroC , InformacionC,InicioC,agregarA 
    ,amigosC,DocumentListComponent ,DocumentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ], 
  providers: [],
  bootstrap: [Principal]
})



export class AppModule { }
