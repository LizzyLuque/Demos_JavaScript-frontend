import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy} from '@angular/core';
import { Escritorio } from 'src/app/models/escritorio';
import { EscritorioService } from 'src/app/services/escritorio.service';

@Component({
  selector: 'app-colas',
  templateUrl: './colas.component.html',
  styleUrls: ['./colas.component.css']
})
export class ColasComponent implements OnInit, AfterViewInit, OnDestroy {
  public escritorio:string;
  public escritorios: Escritorio [];
  
  constructor(
    private elementRef: ElementRef,
    private _eS: EscritorioService  
  ) { 
    this.escritorio="";
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

}
