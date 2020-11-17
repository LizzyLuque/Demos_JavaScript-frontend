import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartItem } from 'src/app/models/chart-item';
import { ChartService } from 'src/app/services/chart.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public lineChartData: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Ventas' }
  ];
  public lineChartLabels: Array<any> = [];//['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  private meses : ChartItem[];
  constructor(
    private _http: HttpClient,
    private _wsService: WebsocketService,
    private _wsChart: ChartService
  ) { 
    this.meses= _wsChart.dameMeses();
    for (let i=0; i<this.meses.length; i++){
      this.lineChartLabels.push(this.meses[i].name);
    }
  }

  ngOnInit(): void {
      this.getData(); 
      this.escucharSocket();
  }

  getData() {
    this._http.get(environment.wsUrl + "/valores/line").subscribe((datos:any)=> this.lineChartData = datos );
  }

  escucharSocket(){
    this._wsService.escuchar('update-data').subscribe((data:any)=>this.lineChartData=data);
  }
 
}
