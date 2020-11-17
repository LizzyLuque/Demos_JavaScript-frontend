import { Emoticon } from './emoticon';

export class Message{
    public color: string;
    constructor(
        public idUser:string,
        public de:string,
        public cuerpo:string            
    ){}

    clean(){
        this.idUser="";
        this.cuerpo="";
        this.de="";
    }
}

export class MessageChat extends Message{
    public clase: string;
    public para: string;
    
    constructor(private obj:any){
        super(obj.idUser, obj.de,obj.cuerpo);
        this.para=obj.para;
        this.color=obj.color;
    }

    cambiaEmoticones(emoticones: Emoticon[]){
        let partes = this.cuerpo.split(" ");

        for(let i=0; i<partes.length; i++){
            let index =emoticones.findIndex(x => x.nombre === partes[i]);
            if(index>=0){
                partes[i]=emoticones[index].generateImg();
            }else{
                partes[i]='<div style="float: left !important; margin-left:2px; margin-right:2px;">'+partes[i]+'</div>';
            }
        }
        this.cuerpo="";
        for(let i=0; i<partes.length; i++){
            this.cuerpo+= partes[i]+" " ;
        }

    }
  

}