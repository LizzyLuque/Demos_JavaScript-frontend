import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserJSON} from '../models/user-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuario= User.instance;
  

  constructor(
    private _http: HttpClient
  ) {
    this.cargarStorage();
  }

  getUser(){
    return this.usuario;
  }

  cargarStorage() {
    if (localStorage.getItem('user')) {
      let usr =JSON.parse(localStorage.getItem('user'));
      this.usuario.setData(usr,usr.token);;
    }
  }

  guardarStorage(){
    localStorage.setItem('user', JSON.stringify(this.usuario));
  }

  login(user: any): Observable<any> {
    return this._http.post(environment.wsUrl + "/login", user);
  }

  logout(){
    localStorage.removeItem('user');
    this.usuario.setData(new UserJSON("","","",""),undefined);

  }

  register(user: any): Observable<any> {
    return this._http.post(environment.wsUrl + "/register", user);
  }

  setLogin(usr:UserJSON,token: string) {
    this.usuario.setData(usr,token);
    this.guardarStorage();
  }

  setToken(token: string) {
    this.usuario.setToken(token);
    this.guardarStorage();
  }
  
  getToken() {
    return this.usuario.getToken();
  }
}
