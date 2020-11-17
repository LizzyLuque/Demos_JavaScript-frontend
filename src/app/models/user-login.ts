
export class User{
    private nombre: string; 
    private email:string;
    private token: string;
    private static _instance: User

    private constructor(){}

    public static get instance(){
        return this._instance || (this._instance=new this());
    }  
    
    public setEmail( email: string){
        this.email=email;
    }
    public setNombre( nombre: string){
        this.nombre=nombre;
    }
    public setToken( t:string){
        this.token=t;
    }         
    
    public getNombre( ){
        return this.nombre;
    }
    public getEmail( ){
        return this.email;
    } 
    public getToken( ){
        return this.token;
    }     
    public setData(usr: UserJSON, token:string){
        this.setNombre(usr.nombre);
        this.setEmail(usr.email);
        this.setToken(token);
    }

}


export class UserJSON{
    constructor(
        public _id:string,
        public nombre: string,
        public email:string,
        public password:string
        ){}       
}

