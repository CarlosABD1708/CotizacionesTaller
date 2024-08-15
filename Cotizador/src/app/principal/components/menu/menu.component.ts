import { Component, signal,Input } from '@angular/core';
import { PrincipalComponent } from '../../principal.component';
import { principal } from 'src/app/models/principal/principal.module';
import { HomepageComponent } from '../../homepage/homepage.component';

@Component({
  selector: 'app-menu',

  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menu = signal<principal[]>([]);
  hideSideMenu = signal(true);
  @Input() id?:string;
  constructor(){

    const InitServices: principal[]=[
      {
      id: Date.now(),
      name: 'Buscador / Proyectos',
      rout: '/proyectos',
      image:'https://static.vecteezy.com/system/resources/previews/000/602/030/original/graph-beautiful-line-black-icon-vector.jpg',
    },
    {
      id: Date.now(),
      name: 'Favoritos',
      rout: '/favoritos',
      image:'https://img.freepik.com/premium-vector/white-star-vector-icon-star-icon-vectorstar-iconstaricon-vector-line-stars_619470-594.jpg?w=740',
    },
    {
      id: Date.now(),
      name: 'Archivados',
      rout: '/archived',
      image:'https://th.bing.com/th/id/OIP.J1TiAzBR1PKvH16czpdUKQHaHa?pid=ImgDet&w=474&h=474&rs=1',
    },
   // {
    //  id: Date.now(),
     // name: 'Editar Proyecto',
     // rout: '/edit_cotizacion',
    //  image:'https://img.freepik.com/premium-vector/compose-icon_1134104-21544.jpg?w=740',
    //},
    {
      id: Date.now(),
      name:'Historial',
      rout: '/historial',
      image: 'https://img.freepik.com/premium-vector/history-vector-illustration-style_717774-5523.jpg?w=740',
    },

  ];
  this.menu.set(InitServices);

  }

  toogleSidemenu(){
    this.hideSideMenu.update(prevState => !prevState);
  }

}
