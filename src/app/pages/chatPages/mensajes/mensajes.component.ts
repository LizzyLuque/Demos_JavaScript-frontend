import { Component, OnInit, EventEmitter } from '@angular/core';
import { MessageChat } from 'src/app/models/message';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  public mensaje: MessageChat;

  constructor(
    public wsService: WebsocketService
  ) { }

  ngOnInit(): void {
  }

  salir(){
    this.wsService.logoutWS();
  }

  mostrarMsgPrivado(e){
    this.mensaje=e;
  }

}
