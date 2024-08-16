import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CotizadorService } from '../cotizador.service';

@Component({
  selector: 'app-editar-cotizacion',
  templateUrl: './editar-cotizacion.component.html',
  styleUrls: ['./editar-cotizacion.component.css']
})
export class EditarCotizacionComponent {
  constructor(private route: ActivatedRoute,private cotizador: CotizadorService,private router: Router) { }
  cotizacion: any = {};
  cotizacion_before: any = {};
  id_cotizacion: string | undefined;
  diferencias:any = []
  area: any = []
  proyectos: any = []
  responsables: any = []
  estado: any = []
 
  ngOnInit() {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      const cotizacionKey = params['cotizacionKey'];
      this.cotizacion = { ...params };
      this.cotizacion_before = { ...params };
      this.id_cotizacion = cotizacionKey;
    });

    // Cargar catálogos
    this.cotizador.get_catalogo('areas').subscribe(response => {
      this.area = response;
    });

    this.cotizador.get_catalogo('proyectos').subscribe(response => {
      this.proyectos = response;
    });

    this.cotizador.get_catalogo('responsables').subscribe(response => {
      this.responsables = response;
    });

    this.cotizador.get_catalogo('estados').subscribe(response => {
      this.estado = response;
    });
  }

  editarCotizacion(id_cotizacion: string | undefined) {
    this.compararCambios();
    const cambios = this.diferencias;
    console.log(cambios);
    this.cotizador.edit_cotizacion(this.id_cotizacion, this.cotizacion, cambios).subscribe();
    
    this.router.navigate(['/principal']);
  }

  compararCambios() {
    const diferencias: { key: string}[] = [];
    
    for (const key in this.cotizacion) {
      if (this.cotizacion.hasOwnProperty(key) && this.cotizacion[key] !== this.cotizacion_before[key]) {
        diferencias.push({ key });
      }
    }

    this.diferencias = diferencias;
  }
}
