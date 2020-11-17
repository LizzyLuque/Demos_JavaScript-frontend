export class Emoticon{    
    private img:string;
    public xIni:number;
    public xFin:number;
    public yIni:number;
    public yFin:number;  
    constructor(
    public xCen:number,
    public yCen:number,
    public nombre:string,
    public xDes:number=0,
    public yDes:number=0     
    ){
      //tamaño del icono es de 36 x 36
      this.xIni=xCen-18;
      this.xFin=xCen+18;
      this.yIni=yCen-18;
      this.yFin=yCen+18;
    }

    generateImg(){
      // h 140 100%  para iono 36 x 36 reducido al 50%
      //    ?   50%

      this.img='<div style="float: left !important; width: 18px; height: 18px; overflow: hidden; margin-top:5px;"><img src="../../../assets/images/emoji2.jpg" style="height: 70px;margin: -'
      +Math.abs((this.yIni+this.yDes)/2)+'px 0px 0px -'+Math.abs((this.xIni+this.xDes)/2)+'px;"></div>';

       return this.img;

    }
}