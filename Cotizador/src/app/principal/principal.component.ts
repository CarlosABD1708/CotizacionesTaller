import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  seccionActual: string = '';
  valor_pendiente: string = 'Pendiente';
  valor_listo: string = 'Listo';
  cambiarSeccion(estado: string) {
    this.seccionActual = estado;
    

  }
}
