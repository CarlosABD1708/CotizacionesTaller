import { Component,Input } from '@angular/core';
import { principal } from 'src/app/models/principal/principal.module';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  @Input ({required: true}) principal!: principal;
}
