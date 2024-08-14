import { Component, OnInit } from '@angular/core';
import { CotizadorService } from '../cotizador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit{

  constructor(private cotizacion: CotizadorService,private router: Router){};

  favs = []
  datos:any = [{}] 
  ngOnInit(): void {
    this.cotizacion.get_attr('favorito').subscribe(response => {
      const datos = response
      this.favs = datos.datos

      this.favs.forEach((item: any) => {
        this.cotizacion.get_data_cotizacion(item).subscribe(response => {
          const data = response
          console.log(data)
          this.datos.unshift(data)
        })
      })

    })

  }
  

}
