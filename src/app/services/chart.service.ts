import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChartItem } from '../models/chart-item';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private meses: ChartItem[];
  private preguntas: ChartItem[];
  
  constructor(
    private _http: HttpClient
  ) {
    this.meses = [
      new ChartItem("enero", "Enero", 0),
      new ChartItem("febrero", "Febrero", 0),
      new ChartItem("marzo", "Marzo", 0),
      new ChartItem("abril", "Abril", 0),
      new ChartItem("mayo", "Mayo", 0),
      new ChartItem("junio", "Junio", 0),
      new ChartItem("julio", "Julio", 0),
      new ChartItem("agosto", "Agosto", 0),
      new ChartItem("septiembre", "Septiembre", 0),
      new ChartItem("octubre", "Octubre", 0),
      new ChartItem("noviembre", "Noviembre", 0),
      new ChartItem("diciembre", "Diciembre", 0)
    ];

    this.preguntas= [
      new ChartItem('1',"¿Le gustan los gatos?", true),
      new ChartItem('2',"¿Hace ejercicio?", true),
      new ChartItem('3',"¿Juega Videojuegos?", true),
      new ChartItem('4',"¿Sabe conducir?", true)
    ];
  }

  dameMeses() {
    return this.meses;
  }

  damePreguntas() {
    return this.preguntas;
  }  

  enviarMes(mes: ChartItem) {
    let payload = {
      mes: mes.id,
      unidad: mes.value
    };
    let params = JSON.stringify(payload);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(environment.wsUrl + '/update', params, { headers: headers });
  }

  enviarPregunta(pregunta: ChartItem) {
    let payload = {
      opcion: pregunta.id,
      respuesta: pregunta.valueInt
    };
    let params = JSON.stringify(payload);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(environment.wsUrl + '/updateBarChart', params, { headers: headers });
  }  
}
