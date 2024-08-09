import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { __param } from 'tslib';
@Injectable({
  providedIn: 'root'
})
export class CotizadorService {
  baseUrl = 'http://192.168.137.1:5000/data/';
  constructor(private http: HttpClient) { }
  private cotizacionesSubject = new BehaviorSubject<any>({ cotizaciones: [] });
  cotizaciones$ = this.cotizacionesSubject.asObservable();

  add_cotizacion( cotizacion: any = {}): Observable<any> {
    const data = {
      id: localStorage.getItem('id'),
      datos: cotizacion
    }
    return this.http.post(this.baseUrl + 'add_cotizacion', data);
  }

  show_cotizaciones(id_usuario: string | undefined): Observable<any> {
    const url = this.baseUrl + `show_cotizaciones?id=${id_usuario}`;
    
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Error en la solicitud de cotizaciones:', error);
        return throwError(error);
      })
    );
  }

  delete_cotizacion(id_user: string | undefined,id_cotizacion:string): Observable<any>{
   return this.http.delete(this.baseUrl +  `delete_cotizacion?id_user=${id_user}&id_cotizacion=${id_cotizacion}`);
  }

  edit_state_cotizacion(id_cotizacion: string): Observable<any> {
    const id_usuario = localStorage.getItem('id');
    return this.http.put(this.baseUrl + `editar_estado?id_user=${id_usuario}&id_cotizacion=${id_cotizacion}`, {});
  }

  edit_cotizacion(id_cotizacion: string | undefined, cotizacion: any = {}): Observable<any> {
    const id_usuario = localStorage.getItem('id');
    const data = {
      id_usuario: id_usuario,
      id_cotizacion : id_cotizacion,
      datos : cotizacion
    }

    return this.http.put(this.baseUrl + 'edit_cotizacion', data);

  }

  get_historial_cotizacion(id_cotizacion: string | undefined,)
}
