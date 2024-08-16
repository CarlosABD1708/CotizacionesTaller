import { Injectable } from '@angular/core';
import { CotizadorService } from './cotizador.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {


  private cotizacionSubject = new BehaviorSubject<any>(null);
  cotizacionesData$ = this.cotizacionSubject.asObservable();



  constructor(private cotizaciones: CotizadorService) {}

  cargarCotizaciones() {
    this.cotizaciones.show_cotizaciones().subscribe(
      (data: any) => {
        this.cotizacionSubject.next(data);
        console.log('Datos de la sala cargados');
      },
      (error) => {
        console.error('Error al obtener información de la sala:', error);
      }
    );
  }

}
