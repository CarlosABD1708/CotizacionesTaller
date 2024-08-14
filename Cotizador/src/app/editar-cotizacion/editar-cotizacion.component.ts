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
  id_cotizacion: string | undefined;

  area: any = []
  proyectos: any = []
  responsables: any = []
  estado: any = []
  ngOnInit() {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      const cotizacionKey = params['cotizacionKey'];
      const cotizacionData = { ...params };
      this.cotizacion =  cotizacionData;
      this.id_cotizacion = cotizacionKey;
    });

     this.cotizador.get_catalogo('areas').subscribe((response) => {
      this.area = response
    })
    this.cotizador.get_catalogo('proyectos').subscribe(response => {
     this.proyectos = response
    })
    this.cotizador.get_catalogo('responsables').subscribe(response => {
     this.responsables = response
    })
    this.cotizador.get_catalogo('estados').subscribe(response => {
     this.estado = response
    })
  }

  editarCotizacion(id_cotizacion: string | undefined){
    this.cotizador.edit_cotizacion(id_cotizacion,this.cotizacion).subscribe();
    
    this.router.navigate(['/principal']);
  }

}
