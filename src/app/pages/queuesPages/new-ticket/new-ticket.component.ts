import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Escritorio } from 'src/app/models/escritorio';
import { Ticket } from 'src/app/models/ticket';
import { ColasService } from 'src/app/services/colas.service';
import { EscritorioService } from 'src/app/services/escritorio.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit, AfterViewInit, OnDestroy {
  public ticket : Ticket;
  public escritorios: Escritorio [];

  constructor(
    private elementRef: ElementRef , 
    private _wsColas: ColasService,
    private _eS: EscritorioService 
  ) {
    this.escritorios= _eS.dameEscritorios();
   }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    this.elementRef.nativeElement.ownerDocument.body.style.color = 'black';
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#6951F0';
    this.elementRef.nativeElement.ownerDocument.body.style.color = 'white';
  }

  ngOnInit(): void {
  }

  generarTicket(escritorio:string){
    this._wsColas.generarTicket(escritorio).subscribe(
      res=>{
        this.ticket=res;
      }, err=>{console.log(err);}
    ); 
    document.getElementById("cerrarModal").click();
    
  }

  nuevo(){
    this.ticket=undefined;
    document.getElementById("openModalButton").click();
  }
}
