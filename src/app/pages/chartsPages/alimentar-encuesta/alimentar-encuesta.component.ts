import { Component, OnInit } from '@angular/core';
import { ChartItem } from 'src/app/models/chart-item';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-alimentar-encuesta',
  templateUrl: './alimentar-encuesta.component.html',
  styleUrls: ['./alimentar-encuesta.component.css']
})
export class AlimentarEncuestaComponent implements OnInit {
  public preguntas: ChartItem[];
  public modal: string;
  constructor(
    private _wsChart: ChartService
  ) {
    this.preguntas = _wsChart.damePreguntas();
    this.modal = "";
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let result = true;
    console.log(this.preguntas);
    try {
      for (let i = 0; i < this.preguntas.length; i++) {
        // enviamos el valor por la API
        this._wsChart.enviarPregunta(this.preguntas[i]).subscribe(
          res => {
            this.preguntas[i].value = false;
          },
          err => {
            throw new Error();
        });
      }
    } catch (error) {
      result = false;
    }

    if (result) this.modal = "Las encuesta se envió correctamente!";
    else this.modal = "Hubo un error al intentar subir la encuesta";
    

  }

}
