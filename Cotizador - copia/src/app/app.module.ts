import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { PrincipalComponent } from './principal/principal.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { TrabajosPendientesComponent } from './trabajos-pendientes/trabajos-pendientes.component';
import { EditarCotizacionComponent } from './editar-cotizacion/editar-cotizacion.component';
import { HistorialComponent } from './historial/historial.component'; // Importa el módulo HttpClientModule


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PrincipalComponent,
    CotizacionComponent,
    TrabajosPendientesComponent,
    EditarCotizacionComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,// Agrega FormsModule a imports
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
