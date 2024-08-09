import { Component, Input } from '@angular/core';
import { CotizadorService } from '../cotizador.service';
import { Route, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-trabajos-pendientes',
  templateUrl: './trabajos-pendientes.component.html',
  styleUrls: ['./trabajos-pendientes.component.css']
})
export class TrabajosPendientesComponent {
  cotizacionesKeys!: string[];
  constructor(private cotizador: CotizadorService,private router: Router,private route: ActivatedRoute){}
  id_usario = localStorage.getItem('id');
  cotizaciones: any;
  @Input() estado: string | undefined;
  private cotizacionesSubscription: Subscription = new Subscription;
  ngOnInit() {
    this.showCotizaciones();
  }

  ngAfterViewInit(){
    this.showCotizaciones();
  } 

  showCotizaciones() {
    const idUsuario = localStorage.getItem('id');
  
    this.cotizador.show_cotizaciones(idUsuario?.toString()).subscribe(
      data => {
        // Asignar las cotizaciones directamente, sin filtrar
        this.cotizaciones = data.cotizaciones;
        // Filtrar las cotizaciones según el estado si existe
        if (this.estado) {
          const cotizacionesFiltradas: any = {};
          
          Object.keys(this.cotizaciones).forEach(cotizacionKey => {
            const cotizacion = this.cotizaciones[cotizacionKey];
            if (cotizacion.data.estado === this.estado) {
              cotizacionesFiltradas[cotizacionKey] = cotizacion;
            }
          });
  
          // Asignar las cotizaciones filtradas
          this.cotizaciones = cotizacionesFiltradas;
        }
  
        // Obtener las claves después de asignar las cotizaciones
        this.cotizacionesKeys = Object.keys(this.cotizaciones);
      },
      error => {
        console.error('Error al obtener las cotizaciones:', error);
      }
    );
  }
  
  
  
  
  getObjectValues(obj: any): any[] {
    return Object.values(obj);
  }

  // Add these methods to your component class
  editCotizacion(cotizacionKey: string) {
    // Obtener los datos de la cotización
    const cotizacionData = this.cotizaciones[cotizacionKey].data;

    // Navegar al nuevo componente y pasar la cotizacionKey y los datos
    this.router.navigate(['/edit_cotizacion'], {
      queryParams: { cotizacionKey: cotizacionKey, ...cotizacionData }
    });
    
    this.ngOnDestroy();
  }

  deleteCotizacion(cotizacionId: string) {
    // Implement your delete logic here
    console.log('Delete cotizacion with id:', cotizacionId);
    this.cotizador.delete_cotizacion(this.id_usario?.toString(),cotizacionId).subscribe();
    this.ngOnDestroy();
    this.router.navigate(['/principal'])
  }

  changeStateCotizacion(cotizacionId: string) {
    // Implement your change state logic here
    console.log('Change state of cotizacion with id:', cotizacionId);

    this.cotizador.edit_state_cotizacion(cotizacionId).subscribe(
      () => {
        // La solicitud HTTP se completó correctamente, ahora recargamos la página
        this.ngOnDestroy();
      },
      error => {
        console.error('Error al cambiar el estado de la cotización:', error);
        // Puedes manejar el error según tus necesidades
      }
    );
  }

  ngOnDestroy() {
    this.showCotizaciones();
  }
  // Add this method to your component class
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }


}
