import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PrincipalComponent } from './principal/principal.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { EditarCotizacionComponent } from './editar-cotizacion/editar-cotizacion.component';
import { MenuComponent } from './principal/components/menu/menu.component';
import { LayoutComponent } from './home/components/layout/layout.component';
import { FavsComponent } from './favs/favs.component';
import { HistorialComponent } from './historial/historial.component';
import { TrabajosPendientesComponent } from './trabajos-pendientes/trabajos-pendientes.component';
import { ArchivadosComponent } from './archivados/archivados.component';
import { ArchivedComponent } from './archived/archived.component';


const routes: Routes = [
  {path:'',
    component: LayoutComponent,
  children:[
  { path: 'principal', component: PrincipalComponent },
  { path: 'add_cotizacion',component: CotizacionComponent },
  { path: 'edit_cotizacion', component: EditarCotizacionComponent },
  { path: 'proyectos', component: TrabajosPendientesComponent },
  { path: 'favoritos', component: FavsComponent },
    { path: 'historial_cotizacion', component: HistorialComponent },
  {path: 'archived',component: ArchivedComponent}
  
]},
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
