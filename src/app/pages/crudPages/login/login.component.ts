import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserJSON } from 'src/app/models/user-login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginCrudComponent implements OnInit {
  public usuario: UserJSON;
  public mensaje: string;
  constructor(
    private _userService: UserService,
    public _router: Router
  ) { 
    this.usuario= new UserJSON("","","","");
  }

  ngOnInit(): void {
  }

  onSubmit(logInForm){
    //const user = {email: this.email, password: this.password};
    this._userService.login(this.usuario).subscribe( data => {
      if(data.ok){
        this._userService.setLogin(data.usuario,data.token);
        this._router.navigateByUrl('/crud');
      }else{        
        this.mensaje= data.message;
      }
    },
    error => {
      console.log(error);
    });
  }
}
