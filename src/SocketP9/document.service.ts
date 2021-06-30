import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Document } from '../app/Componentes/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  currentDocument = this.socket.fromEvent<Document>('document');
  documents = this.socket.fromEvent<string[]>('documents');

  constructor(private socket: Socket) { }

  getDocument(id: string) {
    
    this.socket.emit('getDoc', id);

  }

  newDocument(Nide:string) {
    //this.socket.emit('addDoc', { id: this.docId(), doc: '' });
    this.socket.emit('addDoc', { id: Nide, doc: '' });
  }

  editDocument(document: Document) {
    this.socket.emit('editDoc', document);
  }

  private docId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}