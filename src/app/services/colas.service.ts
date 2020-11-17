import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ColasService {

  constructor(
    public wsService:WebsocketService,
    private _http: HttpClient    
  ) { }
  
  // para recibir los tickets  en el escritorio
  recibirTiket(){
    return this.wsService.escuchar('ticket-nuevo');
  } 

  // para emitir que el escritorio esta listo
  escritorioListo(escritorio:string){
    const payload={
      escritorio: escritorio
    };    
    this.wsService.emitir('escritorio',payload);  
  }

  // Para recibir los tickets en turno en el publico
  recibirTikets(){
    return this.wsService.escuchar('ticket-en-turno');
  }  

  // Para pedir los tickets en turno en el publico
  pedirTikets(){
    return this.wsService.emitir('tickets');
  }    


  /// Genera ticket nuevo
  generarTicket(escritorio:string):Observable<any>{
    const params={
      escritorio: escritorio
    };    
    //let params = JSON.stringify(article);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(environment.wsUrl+'/ticket',params,{headers: headers});
  }  

  // Solicita ticket nuevo manualmente
  atenderTicket(escritorio:string):Observable<any>{
    const params={
      escritorio: escritorio
    };    
    //let params = JSON.stringify(article);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(environment.wsUrl+'/ticket-en-turno',params,{headers: headers});
  }  


}
