import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  password: string = '';
  password2: string = '';
  username: string = '';
  errorMessage: string = '';

  constructor(private auth:AuthService,private router: Router) { }
  
  onSubmit() {
    this.auth.registo(this.username, this.password,this.password2).subscribe(response => {
      if (response.status == 'error') {
        if (response.message == 'EMAIL_EXISTS') {
          this.errorMessage = 'El email ya existe';
        } else if (response.message == 'PASSWORDS_DO_NOT_MATCH') {
          this.errorMessage = 'Las contraseñas no coinciden';
        }
      }
      else {
        this.errorMessage = 'Registro correcto';
        this.router.navigate(['/home']);
      }
      
    });
  }
}
