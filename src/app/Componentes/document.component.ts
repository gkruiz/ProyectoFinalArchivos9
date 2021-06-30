import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { Document } from './document.model';
import { DocumentService } from '../../SocketP9/document.service';




@Component({
  selector: 'app-document',
  templateUrl: './Paginas/document.component.html'
})


export class DocumentComponent implements OnInit, OnDestroy {
  document: Document;
  mensajeNuevo:string='';


  private _docSub: Subscription;

  constructor(private documentService: DocumentService) { }


  ngOnInit() {


    this._docSub = this.documentService.currentDocument.pipe(
      startWith({ id: '', doc: '->' })
    ).subscribe(document => this.document = document);
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }
  
  editDoc() {
    this.document.doc=this.document.doc+"\n ->"+this.mensajeNuevo;
    this.mensajeNuevo="";

    this.documentService.editDocument(this.document);
  }
}