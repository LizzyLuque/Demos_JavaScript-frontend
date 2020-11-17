import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Escritorio } from 'src/app/models/escritorio';
import { Ticket } from 'src/app/models/ticket';
import { ColasService } from 'src/app/services/colas.service';
import { EscritorioService } from 'src/app/services/escritorio.service';

@Component({
  selector: 'app-escritorio',
  templateUrl: './escritorio.component.html',
  styleUrls: ['./escritorio.component.css']
})
export class EscritorioComponent implements OnInit, AfterViewInit, OnDestroy {
  public actual: Ticket;
  public escritorio: Escritorio;
  public mensaje: string;

  constructor(
    private elementRef: ElementRef,
    private _wsColas: ColasService,
    private _route: ActivatedRoute,
    private _eS: EscritorioService
  ) {
    this.actual = new Ticket("", "");
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
    this._route.params.subscribe(params => {
      let id = params.id;
      this.escritorio = this._eS.dameEscritorio(id);
    });
     
    if(this.actual.id==="") this.escritorioListo();
    
    this.recibirTicket();
      
    
  }

  // pedir ticket
  escritorioListo(){
    this._wsColas.escritorioListo(this.escritorio.id);
  }

  /// este es para recibir tickets enviados por el socket cuando el escritorio este libre
  recibirTicket() {
    this._wsColas.recibirTiket().subscribe(
      res=>{
        let ticket = (res as Ticket);
        if(ticket.escritorio==this.escritorio.id)  this.actual=ticket;
      });  
  }

  siguienteTicket() {
    this._wsColas.atenderTicket(this.escritorio.id).subscribe(
      res => {
        if (res.ok) {
          this.actual = res.ticket;
        } else {
          this.mensaje = res.message;
          this.actual.id="";
        }

      },
      err => { console.log(err) });
  }

}
