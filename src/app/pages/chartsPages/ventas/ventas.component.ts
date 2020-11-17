import { Component, OnInit } from '@angular/core';
import { ChartItem } from 'src/app/models/chart-item';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  public meses :ChartItem[];
  public modal :string;
  constructor(
    private _wsChart : ChartService
  ) { 
    this.meses= _wsChart.dameMeses();
    this.modal="";
  }

  ngOnInit(): void {
  }

  onSubmit(ventasForm){
    let result=true;
    try {
      for (let i=0; i<this.meses.length; i++){
        if(this.meses[i].value>0){
          // enviamos el valor por la API
          this._wsChart.enviarMes(this.meses[i]).subscribe(
            res=>{
              this.meses[i].value=0;
            },
            err=>{
              throw new Error();
            }); 
        }
      }        
    } catch (error) {
      result=false;
    }

    if(result) this.modal="Las ventas se sumaron correctamente!";
    else this.modal="Hubo un error al intentar subir la información";

  }

}
