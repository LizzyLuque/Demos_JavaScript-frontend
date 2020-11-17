import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterGuard } from './guards/register.guard';
import { UserCrudGuard } from './guards/user-crud.guard';
import { UsuarioGuardService } from './guards/usuario-guard.service';
import { AlimentarEncuestaComponent } from './pages/chartsPages/alimentar-encuesta/alimentar-encuesta.component';
import { ChartComponent } from './pages/chartsPages/chart/chart.component';
import { EncuestaComponent } from './pages/chartsPages/encuesta/encuesta.component';
import { VentasComponent } from './pages/chartsPages/ventas/ventas.component';
import { LoginComponent } from './pages/chatPages/login/login.component';
import { MensajesComponent } from './pages/chatPages/mensajes/mensajes.component';
import { CrudComponent } from './pages/crudPages/crud/crud.component';
import { DeleteComponent } from './pages/crudPages/delete/delete.component';
import { EditComponent } from './pages/crudPages/edit/edit.component';
import { LoginCrudComponent } from './pages/crudPages/login/login.component';
import { NewComponent } from './pages/crudPages/new/new.component';
import { RegisterComponent } from './pages/crudPages/register/register.component';
import { ViewComponent } from './pages/crudPages/view/view.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { GoogleMapsComponent } from './pages/mapsPages/google-maps/google-maps.component';
import { MapboxComponent } from './pages/mapsPages/mapbox/mapbox.component';
import { ColasComponent } from './pages/queuesPages/colas/colas.component';
import { EscritorioComponent } from './pages/queuesPages/escritorio/escritorio.component';
import { NewTicketComponent } from './pages/queuesPages/new-ticket/new-ticket.component';
import { PublicoComponent } from './pages/queuesPages/publico/publico.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'google-map', component:GoogleMapsComponent},
  { path: 'mapbox', component:MapboxComponent},
  { path: 'encuesta', component:EncuestaComponent },
  { path: 'alimentar-encuesta', component: AlimentarEncuestaComponent},
  { path: 'colas/escritorio/:id', component:EscritorioComponent},
  { path: 'colas/nuevo-ticket', component:NewTicketComponent},  
  { path: 'colas/publico', component: PublicoComponent},    
  { path: 'login', component: LoginComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'alimentar-ventas', component: VentasComponent },
  { path: 'colas', component:ColasComponent},
  { path: 'crud', component:CrudComponent, canActivate: [UserCrudGuard]},  
  { path: 'crud/login', component:LoginCrudComponent,canActivate: [RegisterGuard]},  
  { path: 'crud/register', component:RegisterComponent,canActivate: [RegisterGuard]},    
  { path: 'crud/view/:id', component:ViewComponent ,canActivate: [UserCrudGuard]}, 
  { path: 'crud/edit/:id', component:EditComponent,canActivate: [UserCrudGuard]},
  { path: 'crud/new', component:NewComponent,canActivate: [UserCrudGuard]},  
  { path: 'crud/delete/:id/:image', component:DeleteComponent, canActivate: [UserCrudGuard]},     
  { path: 'mensajes', component: MensajesComponent,  canActivate: [UsuarioGuardService] },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
