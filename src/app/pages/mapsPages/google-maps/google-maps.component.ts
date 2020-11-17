import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Lugar } from 'src/app/interfaces/lugar';
import { WebsocketService } from 'src/app/services/websocket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  @ViewChild('map') mapaElement: ElementRef;
  map: google.maps.Map;
  marcadores: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];
  lugares: Lugar[] = [];

  constructor(
    private _http: HttpClient,
    public _wsService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.escucharSocket();
  }

  getData() {
    this._http.get(environment.wsUrl + "/mapa").subscribe((datos: any) => {
      this.lugares = datos
      this.crearMapa();
    });
  }



  escucharSocket() {
    //marcador-nuevo
    this._wsService.escuchar('marcador-nuevo').subscribe((data: any) => this.agregarMarcador(data));

    //marcador-mover
    this._wsService.escuchar('marcador-mover').subscribe((data: any) => {

      for (const i in this.marcadores) {

        if (this.marcadores[i].getTitle() === data.id) {

          const latLng = new google.maps.LatLng(data.lat, data.lng);
          this.marcadores[i].setPosition(latLng);
          break;
        }
      }

      // this.markersMapbox[ data.id ]
      //   .setLngLat([ data.lng, data.lat ])
    });

    //marcador-borrar 
    this._wsService.escuchar('marcador-borrar').subscribe((id: string) => {
      // this.markersMapbox[id].remove();
      // delete this.markersMapbox[id];
      for (const i in this.marcadores) {
        if (this.marcadores[i].getTitle() === id) {
          this.marcadores[i].setMap(null);
          break;
        }
      }

    });

  }

  crearMapa() {

    const latLng = new google.maps.LatLng(37.784679, -122.395936);

    const mapaOpciones: google.maps.MapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    this.map = new google.maps.Map(this.mapaElement.nativeElement, mapaOpciones);

    this.map.addListener('click', (coors) => {

      const nuevoMarcador: Lugar = {
        nombre: 'Nuevo Lugar',
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        id: (Date.now() + Math.round(Math.random() * 100)).toString(),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      };

      this.agregarMarcador(nuevoMarcador);

      // Emitir evento de socket, agregar marcador
      this._wsService.emitir('marcador-nuevo', nuevoMarcador);
    });


    for (const lugar of this.lugares) {
      this.agregarMarcador(lugar);
    }

  }

  hexToMapsColor (hex) {
    let first_result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let result=null;
    if (first_result) {
       let r =(Math.round((parseInt(first_result[1], 16)*99)/256));
       let g =(Math.round((parseInt(first_result[2], 16)*99)/256));
       let b = (Math.round((parseInt(first_result[3], 16)*99)/256));
       if (r<10) {result="0"+r.toString()} else {result=r.toString()};
       if (g<10) {result+="0"+g.toString()} else {result+=g.toString()};
       if (b<10) {result+="0"+b.toString()} else {result+=b.toString()};
    }
    return result;
  
  }


  agregarMarcador(marcador: Lugar) {
   // var pinImage = new google.maps.MarkerImage("http://www.googlemapsmarkers.com/v1/" +this.hexToMapsColor(marcador.color) + "/");

    const latLng = new google.maps.LatLng(marcador.lat, marcador.lng);

    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable: true,
      //icon: pinImage,
      title: marcador.id
    });

    this.marcadores.push(marker);

    const contenido = `<b>${marcador.nombre}</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content: contenido
    });

    this.infoWindows.push(infoWindow);

    google.maps.event.addDomListener(marker, 'click', () => {

      this.infoWindows.forEach(infoW => infoW.close());
      infoWindow.open(this.map, marker);

    });

    google.maps.event.addDomListener(marker, 'dblclick', (coors) => {
      marker.setMap(null);
      // Disparar un evento de socket, para borrar el marcador
      this._wsService.emitir('marcador-borrar', marcador.id);
    });

    google.maps.event.addDomListener(marker, 'drag', (coors: any) => {

      const nuevoMarcador = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        nombre: marcador.nombre,
        id: marcador.id
      };

      // Disparar un evento de socket, para mover el marcador
      this._wsService.emitir('marcador-mover', nuevoMarcador);

    });
  }




}
