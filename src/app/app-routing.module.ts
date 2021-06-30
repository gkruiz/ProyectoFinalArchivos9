import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Principal } from './Componentes/Principal';
import { LoginC  } from './Componentes/login';
import { RegistroC } from './Componentes/registro';
import { InformacionC } from './Componentes/informacion';
import { InicioC } from './Componentes/inicio';
import { agregarA } from './Componentes/agregar';
import { amigosC } from './Componentes/amigos';
///para sockets
import { DocumentListComponent } from './Componentes/document-list.component';

const routes: Routes = [
  { path: '', component: Principal },
  { path: 'login', component: LoginC },
  { path: 'registro', component: RegistroC },
  { path: 'informacion', component: InformacionC },
  { path: 'inicio', component: InicioC },
  { path: 'agregar', component: agregarA },
  { path: 'amigos', component: amigosC },
  { path: 'chat', component: DocumentListComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
