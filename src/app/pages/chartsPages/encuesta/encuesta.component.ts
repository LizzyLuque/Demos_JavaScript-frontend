import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartItem } from 'src/app/models/chart-item';
import { ChartService } from 'src/app/services/chart.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  public barChartData: Array<any> = [
    { data: [0, 0, 0, 0], label: '' }
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Array<any> = [];// ['Pregunta 1', 'Pregunta 2', 'Pregunta 3','Pregunta 4'];  
  public preguntas : ChartItem[];
  constructor(
    private _http: HttpClient,
    private _wsService: WebsocketService,
    private _wsChart : ChartService
  ) { 
    this.preguntas= _wsChart.damePreguntas();
    for (let i=0; i<this.preguntas.length; i++){
      this.barChartLabels.push(this.preguntas[i].name);
    }    
  }

  ngOnInit(): void {
    this.getData(); 
    this.escucharSocket();    
  }

  getData() {
    this._http.get(environment.wsUrl + "/valores/bar").subscribe((datos:any)=> this.barChartData = datos );
  }

  escucharSocket(){
    this._wsService.escuchar('update-bar-data').subscribe((data:any)=>this.barChartData=data);
  }

}

