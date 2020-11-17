import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-footer-sockets',
  templateUrl: './footer-sockets.component.html',
  styleUrls: ['./footer-sockets.component.css']
})
export class FooterSocketsComponent implements OnInit {

  constructor(
    public wsService: WebsocketService    
  ) { }

  ngOnInit(): void {
    this.wsService.checkStatus();
  }

}
