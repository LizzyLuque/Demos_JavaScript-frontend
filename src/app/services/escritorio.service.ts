import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {Escritorio} from '../models/escritorio'

@Injectable({
  providedIn: 'root'
})
export class EscritorioService {
  private escritorios: Escritorio[];
  constructor() { 
    // se podrian traer de BD, por fines practicos, están en código duro
    this.escritorios=[
      new Escritorio("1","Información"),
      new Escritorio("2","Pagos"),
      new Escritorio("3","Cobros"),
      new Escritorio("4","Quejas")
    ];
  }

  dameEscritorios(){
    return this.escritorios;
  }

  dameEscritorio(id:string){
    return this.escritorios.find(o => o.id === id);
  }
}
