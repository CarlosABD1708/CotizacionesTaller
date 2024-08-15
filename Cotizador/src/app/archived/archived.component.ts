import { Component } from '@angular/core';
import { CotizadorService } from '../cotizador.service';
import { Router } from '@angular/router';
import { RealtimeService } from '../realtime.service';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent {
 constructor(private cotizacion: CotizadorService, private router: Router,private cotizador:CotizadorService,private realtime:RealtimeService) { }

  favs: any[] = [];
  datos: any[] = [];

  ngOnInit(): void {
    this.cotizacion.get_attr('archivado').subscribe(response => {
      this.favs = response.datos;

      this.favs.forEach((item: any) => {
        this.cotizacion.get_data_cotizacion(item).subscribe(response => {
          if (response.archivado === true) {
            this.datos.unshift(response); // Agregar los datos al principio de la lista  
          }
          
        });
      });

      console.log(this.datos);
    });
  }


  addFav(id_cotizacion: string,index: number) {
    this.cotizador.add_attr(id_cotizacion,"favorito").subscribe();
    // this.recargarPagina();
    this.datos[index].favorito = true
  
  }
  
  deleteFav(id_cotizacion: string,index: number) {
    this.cotizador.delete_attr(id_cotizacion,"favorito").subscribe();
    //  this.recargarPagina();
    this.datos[index].favorito = false
   
  }
  
  addArchived(id_cotizacion: string,index: number) {
    this.cotizador.add_attr(id_cotizacion,"archivado").subscribe();
    this.datos[index].archivado = true  

    
    
  }
  
  deleteArchived(id_cotizacion: string,index: number) {
    this.cotizador.delete_attr(id_cotizacion,"archivado").subscribe();


    this.datos[index].archivado = false  
    

    this.recargarPagina()
    
  }

  showHistory(cotizacionKey: string) {

    // Navegar al nuevo componente y pasar la cotizacionKey y los datos
    this.router.navigate(['/historial_cotizacion'], {
      queryParams: { id_cotizacion: cotizacionKey}
  });
    
    
  }

  editCotizacion(cotizacionKey: string, index: number) {
      // Obtener los datos de la cotización
      
      const cotizacionData = this.datos[index].data;

      // Navegar al nuevo componente y pasar la cotizacionKey y los datos
      this.router.navigate(['/edit_cotizacion'], {
        queryParams: { cotizacionKey: cotizacionKey, ...cotizacionData }
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
}
