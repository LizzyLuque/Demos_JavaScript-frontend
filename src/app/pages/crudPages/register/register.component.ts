import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserJSON } from 'src/app/models/user-login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public usuario: UserJSON;
  public confirmPassword: string;
  public passwordError: boolean;
  public mensaje: string;
  constructor(
    private _userService: UserService,
    public _router: Router
  ) { 
    this.confirmPassword="";
    this.passwordError=false;
    this.usuario= new UserJSON("","","","");
  }

  ngOnInit(): void {
  }

  clean(){
    if(this.passwordError) this.passwordError=false;
  }
  register(registerForm) {
    if(this.usuario.password!==this.confirmPassword){
      this.passwordError=true;
      this.confirmPassword="";
      return false;
    }

    this._userService.register(this.usuario).subscribe(data => {
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
