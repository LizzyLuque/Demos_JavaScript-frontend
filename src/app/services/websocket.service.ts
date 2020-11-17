import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { User, UserJSON } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = SocketStatus.instance;
  private usuario=User.instance;

  constructor(
    private socket: Socket,
    private router:Router
  ) { 
    this.cargarStorage();
  }

  checkStatus(){
    this.socket.on("connect", ()=>{
      console.log('Conectado al servidor');
      this.socketStatus.setStatus(true);
      this.cargarStorage();
    });

    this.socket.on("disconnect", ()=>{
      console.log('Desconectado al servidor');
      this.socketStatus.setStatus(false);
    });

  }

  emitir(evento:string, payload?: any, callback?:({}) =>any){
      // emit('evento', payload, callback?)
      this.socket.emit(evento,payload,callback);
  }

  escuchar(evento:string){
    return this.socket.fromEvent(evento);
  }

  loginWS(usr:UserJSON){
    //let usr= this.usuario;
    usr.color= this.usuario.getColor();
    return new Promise((res, rej)=>{
      this.emitir('configurar-usuario', usr , (resp:any) => {
        this.usuario.setData(usr, resp.idUser );
        this.guardarStorage();
        res();
    });
    });

  }

  logoutWS(){
    localStorage.removeItem('usuario');
    this.usuario.setNombre("usuario-anónimo");
/*      const payload={
       nombre :'usuario-anónimo'
     } */
    this.emitir('configurar-usuario',this.usuario,res=>{});
    
    this.router.navigateByUrl('/login');

  }

  guardarStorage(){
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage(){
      if(localStorage.getItem('usuario')){
        //let usr = new UserJSON("","","","");
        let usr=JSON.parse(localStorage.getItem('usuario'));
        this.loginWS(usr);
      }
  }
  getUser(){
    return this.usuario;
  }

  configurarColor(color:string){
    this.usuario.setColor(color);
   // let nombre =this.usuario.getNombre();
    return new Promise((res, rej)=>{
      this.emitir('configurar-usuario', this.usuario , (resp:any) => {
        this.guardarStorage();
        res();
    });
    });    
  }


}

class SocketStatus{
  public socketStatus = false;
  private static _instance: SocketStatus;

  private constructor(){}

  public static get instance(){
    return this._instance || (this._instance=new this());
  }    

  getStatus(){
    return this.socketStatus;
  }

  setStatus(valor:boolean){
    this.socketStatus=valor;
  }
}
