import { Component, Input } from '@angular/core';
import { CotizadorService } from '../cotizador.service';
import { NavigationEnd, Route, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { RealtimeService } from '../realtime.service';


@Component({
  selector: 'app-trabajos-pendientes',
  templateUrl: './trabajos-pendientes.component.html',
  styleUrls: ['./trabajos-pendientes.component.css']
})
export class TrabajosPendientesComponent {
  cotizacionesKeys!: string[];
  constructor(private cotizador: CotizadorService,private router: Router,private realtime: RealtimeService){}
  id_usario = localStorage.getItem('id');
  cotizaciones: any;
  @Input() estado: string | undefined;
  
  private cotizacionesSubscription: Subscription | undefined;
  
  ngOnInit() {
    //  if (this.cotizacionesSubscription) {
    //   this.cotizacionesSubscription.unsubscribe();
    // } 
    // this.showCotizaciones();
    this.realtime.cargarCotizaciones();

    this.cotizacionesSubscription = this.realtime.cotizacionesData$.subscribe((data) => {
        
      this.cotizaciones = data.cotizaciones;
      // Filtrar las cotizaciones según el estado si existe
      // if (this.estado) {
        const cotizacionesFiltradas: any = {};
          
        Object.keys(this.cotizaciones).forEach(cotizacionKey => {
          const cotizacion = this.cotizaciones[cotizacionKey];
          // if (cotizacion.data.archivado === false) {
          if (!this.cotizaciones[cotizacionKey].archivado) {
            cotizacionesFiltradas[cotizacionKey] = cotizacion;
          }
            
          
        });
  
        // Asignar las cotizaciones filtradas
        this.cotizaciones = cotizacionesFiltradas;
      
  
      // Obtener las claves después de asignar las cotizaciones
      this.cotizacionesKeys = Object.keys(this.cotizaciones);
    },
    error => {
        console.error('Error al obtener las cotizaciones:', error);
      });
    // Suscribirse a cambios de ruta para recargar datos cuando se navega a la misma ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.cargarDatos();
    });
    
    
  }
  
  cargarDatos() {
    this.realtime.cargarCotizaciones();
  }


  recargarPagina() {
    const currentUrlWithExtras = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this.router.navigate([currentUrlWithExtras]);
    });

    this.cargarDatos();
  }

  // showCotizaciones() {
  
  //   this.cotizador.show_cotizaciones().subscribe(
  
  //   );
  // }
  
  
  addFav(id_cotizacion: string) {
    this.cotizador.add_attr(id_cotizacion,"favorito").subscribe();
    // this.recargarPagina();
    this.cotizaciones[id_cotizacion].favorito = true
  
  }
  
  deleteFav(id_cotizacion: string) {
    this.cotizador.delete_attr(id_cotizacion,"favorito").subscribe();
    //  this.recargarPagina();
    this.cotizaciones[id_cotizacion].favorito = false
   
  }
  
  addArchived(id_cotizacion: string) {
    this.cotizador.add_attr(id_cotizacion,"archivado").subscribe();
    // this.recargarPagina();
    // this.showCotizaciones();
    const subs = this.realtime.cotizacionesData$.subscribe(() => {
      this.cotizaciones[id_cotizacion].archivado = true  
      this.cargarDatos()
    })
    
    
  }
  
  deleteArchived(id_cotizacion: string) {
    this.cotizador.delete_attr(id_cotizacion,"archivado").subscribe();
    // this.recargarPagina();
    this.cotizaciones[id_cotizacion].archivado = false
    
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

    // Add these methods to your component class
  showHistory(cotizacionKey: string) {

    // Navegar al nuevo componente y pasar la cotizacionKey y los datos
    this.router.navigate(['/viewHistory'], {
      queryParams: { id_cotizacion: cotizacionKey}
    });
    
    this.ngOnDestroy();
  }

  deleteCotizacion(cotizacionId: string) {
    // Implement your delete logic here
    console.log('Delete cotizacion with id:', cotizacionId);
    this.cotizador.delete_cotizacion(this.id_usario?.toString(),cotizacionId).subscribe();
    this.recargarPagina();
  }

  changeStateCotizacion(cotizacionId: string) {
    // Implement your change state logic here
    console.log('Change state of cotizacion with id:', cotizacionId);

    this.cotizador.edit_state_cotizacion(cotizacionId).subscribe(
      () => {
        // La solicitud HTTP se completó correctamente, ahora recargamos la página
         this.recargarPagina();
      },
      error => {
        console.error('Error al cambiar el estado de la cotización:', error);
        // Puedes manejar el error según tus necesidades
      }
    );
  }

  ngOnDestroy() {
    if (this.cotizacionesSubscription) {
      this.cotizacionesSubscription.unsubscribe();
    }
  }

  // Add this method to your component class
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }


}
