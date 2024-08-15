import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  list = [
    {
      icon: 'bi bi-journal-plus',
      label: 'Agregar Proyectos',
      href: '/add_cotizacion',
    },
    {
      icon: 'bi bi-graph-up',
      label: 'Proyectos',
      href: '',
    },
    {
      icon: 'bi bi-star',
      label: 'Favoritos',
      href: '#',

    },

  ];
  @Input() sideNavStatus: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
