import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, MessageChat } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ChatService } from 'src/app/services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  public message:MessageChat;
  public usuario: User;
  @Output() PrivateMsg = new EventEmitter();

  usuariosActivosObs:Observable<any>;
  constructor(
    public chatService:ChatService,
    private wsSocket: WebsocketService
  ) { 
    this.message= new MessageChat(new Message("","",""));
    //this.messageRecived= new MessageJSON("","");
  }

  ngOnInit(): void {
        //Emitir solicitud de lista de usuarios
        this.chatService.emitirUsuariosActivosByCliente();
        this.usuariosActivosObs= this.chatService.getUsuariosActivos();
        this.usuario=this.wsSocket.getUser();
        //this.escucharMensajesPrivados();
  }

  setUser(userName, id){
    this.message.idUser=id;
    //this.=userName+"@"+id;  
    this.message.para=userName;
    this.message.de=this.usuario.getNombre();
  }

  sendMensajePrivado(e){
    //let msgSend= new Message(this.message.idUser,this.usuario.getNombre(), this.message.cuerpo);
    this.chatService.enviarMensajePrivado(this.message).subscribe(
      (res:any)=>{
        if(res.ok){
          let mesP= new MessageChat(this.message);
          //mesP.para= this.message.de;
          this.PrivateMsg.emit(mesP);
          this.message.clean();
        }
      }, 
      err=>{ console.log(err);});
    //alert(this.message.content);
    document.getElementById("cancelar").click();

  }

  cambiarColor(valor){
    let color= valor.target.value;
    this.wsSocket.configurarColor(color);
  }



  

}
