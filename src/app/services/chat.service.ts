import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService:WebsocketService,
    private _http: HttpClient
  ) { }

  enviarMensaje(mensaje:string){
    const payload={
      de: this.wsService.getUser().getNombre(),
      cuerpo: mensaje,
      color: this.wsService.getUser().getColor(),
      sala: this.wsService.getUser().getSala()
    };
    this.wsService.emitir('mensaje',payload);
  }

  recibirMensaje(){
    return this.wsService.escuchar('mensaje-nuevo');
  }

  getMensajesPrivados(){
    return this.wsService.escuchar('mensaje-privado');
  }

  getUsuariosActivos(){
    return this.wsService.escuchar('usuarios-activos');
  }

  emitirUsuariosActivosByCliente(){
    this.wsService.emitir('lista-usuarios');
  }

  enviarMensajePrivado(message: Message){
    message.color=this.wsService.getUser().getColor();  //pendiente de si se necesita aqui
    let params = JSON.stringify(message);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(environment.wsUrl+'/mensajes/'+message.idUser,params,{headers: headers});    
  }

}
