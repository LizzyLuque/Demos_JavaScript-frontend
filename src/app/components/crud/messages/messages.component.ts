import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() ruta: string;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    document.getElementById("openModalButton").click();
  }

  redirige(){
    this._router.navigate([this.ruta]);
  }

}
