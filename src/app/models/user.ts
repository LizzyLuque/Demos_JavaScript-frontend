export class User{
    private sala:string;
    private color:string;
    private nombre: string; 
    private  socket:string;
    private static _instance: User;

    private constructor(
        
    ){
        this.sala='sin-sala';
        let simbolos, c;
        simbolos = "0123456789ABCDEF";
        c = "#";
    
        for(var i = 0; i < 6; i++){
            c = c + simbolos[Math.floor(Math.random() * 16)];
        }

        this.color=c;
    }

    public static get instance(){
        return this._instance || (this._instance=new this());
    }  
    
    public setSala( sala: string){
        this.sala=sala;
    }
    public setNombre( nombre: string){
        this.nombre=nombre;
    }
    public setSoket( socket: string){
        this.socket=socket;
    }      

    public setColor( color:string){
        this.color=color;
    }         
    
    public getSala( ){
        return this.sala;
    }
    public getNombre( ){
        return this.nombre;
    }
    public getSoket( ){
        return this.socket;
    } 

    public getColor( ){
        return this.color;
    }     
    
    public setData(usr: UserJSON, socket:string){
        this.setNombre(usr.nombre);
        this.setSala(usr.sala);
        this.setSoket(socket);
    }

}

export class UserJSON{
    constructor(
    public color:string,
    public sala:string,
    public nombre: string,
    public socket:string, 
    ){}   
}

