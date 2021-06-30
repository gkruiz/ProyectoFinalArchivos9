import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { DocumentService } from '../../SocketP9/document.service';
import { NombreServicioService } from '../../servicio/nombre-servicio.service';


@Component({
  selector: 'app-document-list',
  templateUrl: './Paginas/document-list.component.html'
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Observable<string[]>;
  currentDoc: string;
  private _docSub: Subscription;
  info:any=[];
  valorx:string;

  constructor(private documentService: DocumentService,private servicio:NombreServicioService) { }




  muesImagen:string="";
  ngOnInit() {
    this.documents = this.documentService.documents;

    let idUsuario= localStorage.getItem('id');
    let imaU= localStorage.getItem('urlf');
    if(idUsuario&&imaU){
      this.muesImagen="../../../assets/ImgUsuario/"+imaU;
      let contactos=this.servicio.getAmigos(idUsuario).subscribe(
        res => {  
          this.info=res;
        }
      );
    }else{
      console.log("No hay una session activa");
    }

    this._docSub = this.documentService.currentDocument.subscribe(doc => this.currentDoc = doc.id);
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }



  loadDoc(id: string) {
    console.log(id);
    let idUsuario= localStorage.getItem('id');
    if(idUsuario){
      var arregla=this.arreglaId(idUsuario,id);
      this.newDoc(arregla);
      this.documentService.getDocument(arregla);
    }else{
      console.log("No hay una session activa");
      alert("No hay una session activa");
    }
    
  }

  newDoc(Nide:string) {
    this.documentService.newDocument(Nide);
  }

  arreglaId(primero:string,segundo:string){
    //arregla el id para el host
    var id1=Number(primero);
    var id2=Number(segundo);
    var retorno="";
    if(id1>id2){
      retorno=id2.toString()+"XID"+id1.toString();
    }else{
      retorno=id1.toString()+"XID"+id2.toString();
    }
    return retorno;
  }

}