import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PrincipalComponent } from './principal/principal.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { EditarCotizacionComponent } from './editar-cotizacion/editar-cotizacion.component';


const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home',component: HomeComponent },
  { path: 'principal',component: PrincipalComponent},
  { path: 'add_cotizacion',component: CotizacionComponent },
  { path: 'edit_cotizacion',component: EditarCotizacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
