import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserJSON } from 'src/app/models/user';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public nombre:string;
  public usr: UserJSON;
  constructor(
    public wsService:WebsocketService,
    private router: Router
  ) {
    this.nombre="";
    this.usr=new UserJSON("","","","");
   }

  ngOnInit(): void {
  }

  ingresar(){
    this.wsService.loginWS(this.usr).then(()=>{
      this.router.navigateByUrl('/mensajes');
    });
  };

}
