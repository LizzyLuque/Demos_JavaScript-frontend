import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { ColasService } from 'src/app/services/colas.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})
export class PublicoComponent implements OnInit, AfterViewInit, OnDestroy {
  public enAtencion: Ticket[];
  public actual: Ticket;
  public altura: number;
  public audio: any;


  constructor(
    private elementRef: ElementRef,
    private _wsColas: ColasService,
    public wsService: WebsocketService
  ) {
    //this.actual=new Ticket("","");
    this.enAtencion = [];
    this.audio = new Audio('assets/audio/new-ticket.mp3');
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    this.elementRef.nativeElement.ownerDocument.body.style.color = 'black';
    this.elementRef.nativeElement.ownerDocument.body.style.marginBottom = '100px';
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#6951F0';
    this.elementRef.nativeElement.ownerDocument.body.style.color = 'white';
    this.elementRef.nativeElement.ownerDocument.body.style.marginBottom = '0px';
  }

  ngOnInit(): void {    
    this.recibirTickets();
    this.solicitarTickets();
  }

  solicitarTickets() {
    this._wsColas.pedirTikets();
  }

  recibirTickets() {
    this._wsColas.recibirTikets().subscribe(
      (res: any) => {
        if (res.ticketActual) this.audio.play();
        this.actual = res.ticketActual;
        this.enAtencion = res.ticketsEnAtencion;
        this.altura = Math.floor(100 / this.enAtencion.length);


      });
  }

}
