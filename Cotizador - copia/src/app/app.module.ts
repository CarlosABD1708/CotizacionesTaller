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
import { SidebarComponent } from './home/modules/sidebar/sidebar.component';
import { HeaderComponent } from './home/components/header/header.component';
import { MenuComponent } from './principal/components/menu/menu.component';
import { HomepageComponent } from './principal/homepage/homepage.component';
import { LayoutComponent } from './home/components/layout/layout.component'; // Importa el módulo HttpClientModule
import { FavsComponent } from './favs/favs.component';
import { HistorialComponent } from './historial/historial.component';
import { ArchivadosComponent } from './archivados/archivados.component';
import { ArchivedComponent } from './archived/archived.component';


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
    SidebarComponent,
    HeaderComponent,
    MenuComponent,
    HomepageComponent,
    LayoutComponent,
    FavsComponent,
    HistorialComponent,
    ArchivedComponent,

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
