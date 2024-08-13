import { Component, OnInit } from '@angular/core';
import { CotizadorService } from '../cotizador.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit{
  
  constructor(private cotizador: CotizadorService,private route: ActivatedRoute) {}
  historial = [];
  cotizaciones: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id_cotizacion = params['id_cotizacion'];  
      this.cotizador.get_historial_cotizacion(id_cotizacion).subscribe(response => {
        console.log(response);
        this.cotizaciones = response
       });
    });
  }


}
