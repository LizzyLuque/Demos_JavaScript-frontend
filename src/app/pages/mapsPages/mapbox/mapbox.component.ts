import { Component, OnInit } from '@angular/core';
import { Lugar } from 'src/app/interfaces/lugar';
import * as mapboxgl from 'mapbox-gl';
import { WebsocketService } from 'src/app/services/websocket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {
  mapa: mapboxgl.Map;
  markersMapbox: { [id:string]: mapboxgl.Marker } = {}
  lugares: Lugar[] ;

  constructor(
    private _http: HttpClient,   
    private _wsService:WebsocketService
  ) { }

  ngOnInit(): void {
    //
    this.getData();
    this.escucharSocket();
     
  }

  crearMapa() {

    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibGl6enlsdXF1ZSIsImEiOiJja2djamk3Z3EwcmpjMnRxcWphbmF5MzF4In0.katsRKp_wEPYK8Trdz6Suw';
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center:[-122.39593693582937,37.784679429009954], 
      zoom: 12
    });

    for(const marcador of this.lugares){
        this.agregarMarcador(marcador);
    }

  }

  agregarMarcador( marcador: Lugar ) {

    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;

    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = 'Borrar';

    const div = document.createElement('div');
    div.append(h2, btnBorrar);


    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setDOMContent( div );

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color
    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup( customPopup )
    .addTo( this.mapa );


    marker.on('drag', () => {
      const lngLat = marker.getLngLat();

      const nuevoMarcador = {
        id: marcador.id,
        ...lngLat
      }

      this._wsService.emitir( 'marcador-mover', nuevoMarcador );

    });

    btnBorrar.addEventListener( 'click', () => {
      marker.remove();
      this._wsService.emitir( 'marcador-borrar', marcador.id );
    });

    this.markersMapbox[ marcador.id ] = marker;

  }

  crearMarcador(){
    const custMarker:Lugar ={
      id:(Date.now()+Math.round(Math.random()*100)).toString(),
      lng:-122.39593693582937,
      lat:37.784679429009954, 
      nombre: 'Sin Nombre',
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    }
    this.agregarMarcador(custMarker);
    //marcador-nuevo
    this._wsService.emitir('marcador-nuevo',custMarker);    
  }

  getData() {
    this._http.get(environment.wsUrl + "/mapa").subscribe((datos:any)=>{
     this.lugares=datos
     this.crearMapa();
    });
  }

 

  escucharSocket(){
    //marcador-nuevo
    this._wsService.escuchar('marcador-nuevo').subscribe((data:any)=>this.agregarMarcador(data));

    //marcador-mover
    this._wsService.escuchar('marcador-mover').subscribe((data:any)=>{
        
        this.markersMapbox[ data.id ]
          .setLngLat([ data.lng, data.lat ])
    });

    //marcador-borrar 
    this._wsService.escuchar('marcador-borrar').subscribe( (id: string) => {
      this.markersMapbox[id].remove();
      delete this.markersMapbox[id];
    });
    
  }  

}
