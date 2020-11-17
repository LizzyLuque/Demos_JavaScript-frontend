import { NodeWithI18n } from '@angular/compiler';
import { Component, OnDestroy, OnInit, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageChat } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat.service';
import { EmoticonService } from 'src/app/services/emoticon.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  public texto: string;
  public mensajesSubs: Subscription;
  public mensajes: any[] = [];
  public elemento: HTMLElement;
  @Input() message: MessageChat;


  constructor(
    public chatService: ChatService,
    public emticonService: EmoticonService
  ) {
    this.texto = '';

  }

  ngOnDestroy(): void {
    this.mensajesSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.recibir();
    this.recibirMsgPrivados();
  }

  ngOnChanges(changes: SimpleChanges) {

    this.mostrarMsgPrivadosEnviados();

  }

  ngAfterViewInit() {
    this.elemento = document.getElementById('chat-mensajes');
  }

  enviar() {
    if (this.texto.trim().length == 0) {
      return;
    }

    this.chatService.enviarMensaje(this.texto);
    this.texto = '';
  }

  recibir() {
    this.mensajesSubs = this.chatService.recibirMensaje().subscribe((msg: any) => {
      if (msg.sala === this.chatService.wsService.getUser().getSala()) {
        let msgPu = new MessageChat(msg);
        msgPu.cambiaEmoticones(this.emticonService.dameEmoticones());
        this.mensajes.push(msgPu);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      }
    });
  }

  recibirMsgPrivados() {
    this.mensajesSubs = this.chatService.getMensajesPrivados().subscribe((msg: any) => {
      let msgP = new MessageChat(msg);
      msgP.clase = "msgPrivado";
      msgP.de = msg.de + "@private";

      msgP.cambiaEmoticones(this.emticonService.dameEmoticones());

      this.mensajes.push(msgP);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });
  }


  mostrarMsgPrivadosEnviados() {
    if (this.message) {
      let msgP = new MessageChat(this.message);
      msgP.clase = "msgPrivadoMio";
      msgP.de = this.message.de + "@sendTo->" + this.message.para;

      msgP.cambiaEmoticones(this.emticonService.dameEmoticones());

      this.mensajes.push(msgP);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    }
  }

  muestraIcons() {
    document.getElementById("openModalButton").click();
  }
  cerrar() { }

  icon(e) {
    var xCoordinate = e.offsetX;
    var yCoordinate = e.offsetY;
    //console.log("x:"+xCoordinate+" y:"+yCoordinate);/**/
    let emo = this.emticonService.dameEmoticon(xCoordinate, yCoordinate);  ///cambiar coordenadas a interpolacion
    if (emo) {
      this.chatService.enviarMensaje(emo.nombre);
      document.getElementById("cerrarModal").click();
    }

  }


}
