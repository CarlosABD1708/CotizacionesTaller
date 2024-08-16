import { Component, OnInit,Input} from '@angular/core';
import { CotizadorService } from '../cotizador.service';
import { Router } from '@angular/router';
import { RealtimeService } from '../realtime.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit {

  constructor(private cotizacion: CotizadorService, private router: Router,private cotizador:CotizadorService,private realtime:RealtimeService) { }

  favs: any[] = [];
  datos: any[] = [];

  ngOnInit(): void {
    this.cotizacion.get_attr('favorito').subscribe(response => {
      this.favs = response.datos;

      this.favs.forEach((item: any) => {
        this.cotizacion.get_data_cotizacion(item).subscribe(response => {
          this.datos.unshift(response); // Agregar los datos al principio de la lista
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
  
  deleteFav(id_cotizacion: string, index: number) {
    this.cotizador.delete_attr(id_cotizacion, "favorito").subscribe();
    //  this.recargarPagina();
   
    this.datos[index].favorito = false
    this.recargarPagina() 
  }
  
  addArchived(id_cotizacion: string,index: number) {
    this.cotizador.add_attr(id_cotizacion,"archivado").subscribe();
    // this.recargarPagina();
    // this.showCotizaciones();
   
    this.datos[index].archivado = true   
  }
  
  deleteArchived(id_cotizacion: string,index: number) {
    this.cotizador.delete_attr(id_cotizacion,"archivado").subscribe();
    // this.recargarPagina();
    
    
      this.datos[index].archivado = false
    
    
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
  }
}

