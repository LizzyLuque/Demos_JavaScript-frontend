import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//modulo para usar servicios REST
import {HttpClientModule} from '@angular/common/http';

// modulo para trabajar con formularios
import {FormsModule} from '@angular/forms'

//Modulo para gráfica
import { ChartsModule } from 'ng2-charts';

//Módulo para editar fechas
import { MomentModule } from 'angular2-moment';

//librería para usar sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = {
  url: environment.wsUrl, options: {}
};

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';


//componentes de mi aplicación
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/crud/list/list.component';
import { SafehtmlPipe } from './pipes/safehtml.pipe';
import { SubheaderComponent } from './components/crud/subheader/subheader.component';
import { MessagesComponent } from './components/crud/messages/messages.component';
import { LoginComponent } from './pages/chatPages/login/login.component';
import { LoginCrudComponent } from './pages/crudPages/login/login.component';
import { MensajesComponent } from './pages/chatPages/mensajes/mensajes.component';
import { HomeComponent } from './pages/home/home.component';
import { ChartComponent } from './pages/chartsPages/chart/chart.component';
import { ErrorComponent } from './pages/error/error.component';
import { EncuestaComponent } from './pages/chartsPages/encuesta/encuesta.component';
import { MapboxComponent } from './pages/mapsPages/mapbox/mapbox.component';
import { GoogleMapsComponent } from './pages/mapsPages/google-maps/google-maps.component';
import { CrudComponent } from './pages/crudPages/crud/crud.component';
import { NewComponent } from './pages/crudPages/new/new.component';
import { EditComponent } from './pages/crudPages/edit/edit.component';
import { DeleteComponent } from './pages/crudPages/delete/delete.component';
import { ViewComponent } from './pages/crudPages/view/view.component';
import { RegisterComponent } from './pages/crudPages/register/register.component';
import { ColasComponent } from './pages/queuesPages/colas/colas.component';
import { PublicoComponent } from './pages/queuesPages/publico/publico.component';
import { NewTicketComponent } from './pages/queuesPages/new-ticket/new-ticket.component';
import { EscritorioComponent } from './pages/queuesPages/escritorio/escritorio.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { ListaUsuariosComponent } from './components/chat/lista-usuarios/lista-usuarios.component';
import { VentasComponent } from './pages/chartsPages/ventas/ventas.component';
import { AlimentarEncuestaComponent } from './pages/chartsPages/alimentar-encuesta/alimentar-encuesta.component';
import { FooterSocketsComponent } from './components/footer-sockets/footer-sockets.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    ListaUsuariosComponent,
    LoginComponent,
    LoginCrudComponent,
    MensajesComponent,
    HomeComponent,
    ChartComponent,
    ErrorComponent,
    EncuestaComponent,
    MapboxComponent,
    GoogleMapsComponent,
    ColasComponent,
    PublicoComponent,
    NewTicketComponent,
    EscritorioComponent,
    HeaderComponent,
    CrudComponent,
    ListComponent,
    NewComponent,
    EditComponent,
    DeleteComponent,
    ViewComponent,
    SafehtmlPipe,
    RegisterComponent,
    SubheaderComponent,
    MessagesComponent,
    VentasComponent,
    AlimentarEncuestaComponent,
    FooterSocketsComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),   // módulo para sockets
    AppRoutingModule,
    FormsModule,     //modulo para formularios
    HttpClientModule, // módulo para hacer peticiones REST
    MomentModule, //Manipular fechas
    ChartsModule     //módulo para grafica
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
