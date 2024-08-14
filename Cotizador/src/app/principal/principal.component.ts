import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  constructor(private route:Router){}
  seccionActual: string = '';
  valor_pendiente: string = 'Pendiente';
  valor_listo: string = 'Listo';
  cambiarSeccion(estado: string) {
    this.seccionActual = estado;
    

  }

  changuePage(pagina: string) {
    this.route.navigate(['/' + pagina])
  }
}
