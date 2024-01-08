import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  constructor(private auth: AuthService, private router: Router) { }

  onSubmit(): void {
    this.auth.login(this.username, this.password).subscribe(response => {
      if (response.status == "success") {
        const id = response.id
        localStorage.setItem('id',id);
        this.router.navigate(['/principal']);
      } else if(response.status == "error") {
        if (response.message == "INVALID_LOGIN_CREDENTIALS") {
          this.errorMessage = "Usuario o Contraseña incorrectos";
        }

      }
    });
  }
}
