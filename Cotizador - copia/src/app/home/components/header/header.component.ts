import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { RouterLinkWithHref,RouterLinkActive , Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  hideSideMenu = signal(true);
  constructor(
    private router: Router,
    ){}
  image = 'https://enviapaqueteria.s3.us-east-2.amazonaws.com/uploads/carriers/PAQUETEXPRESS.png';
  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  toogleSidemenu(){
    this.hideSideMenu.update(prevState => !prevState);
  }

 
}
