import { Injectable } from '@angular/core';
import { Emoticon } from '../models/emoticon';

@Injectable({
  providedIn: 'root'
})
export class EmoticonService {
  private emoticones: Emoticon[];
  constructor() {
    let tam=35;

    //podrian solicitarse de una base de datos
    this.emoticones=[
      new Emoticon(16, 18, ":D"),
      new Emoticon(52, 18, ":'D"),
      new Emoticon(89, 18, "=D"),
      new Emoticon(125, 18,":b"),
      new Emoticon(161, 18, "':D"),
      new Emoticon(197, 18,"xD"),
      new Emoticon(234, 18, ";)"),

      new Emoticon(16, 54, ";*"),
      new Emoticon(52, 54, ":*"),
      new Emoticon(89, 54, "=*"),
      new Emoticon(125, 54, ":**"),
      new Emoticon(161, 54, ":)"),
      new Emoticon(197, 54, "=)"),
      new Emoticon(233, 54, ":)|"),
      
      new Emoticon(16, 87, ":|"),
      new Emoticon(52, 87, "::"),
      new Emoticon(89, 87, "8|"),
      new Emoticon(125, 87, ";¬]"),
      new Emoticon(161, 87, "X("),
      new Emoticon(197, 87, "':("),
      new Emoticon(234, 87, ":O"),
      
      new Emoticon(16, 122, "z:o", 0, 12),
      new Emoticon(52, 122, ":)/", 0, 14),
      new Emoticon(89, 122, ":P", 0, 14),
      new Emoticon(125, 122, ";P", 0, 14),
      new Emoticon(161, 112, "xP", 0, 24),
      new Emoticon(197, 122, "¬¬", 0, 14),
      new Emoticon(234, 122, "':C", 0, 12)  
    ];

    
  }

  dameEmoticones(){
    return this.emoticones;
  }

  dameEmoticon(x: number, y:number){
    for (let i=0; i<this.emoticones.length; i++){
      let emo=this.emoticones[i];
      if (x>emo.xIni && x<emo.xFin && y>emo.yIni && y<emo.yFin) return emo;
    }

  }
}
