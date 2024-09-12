import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit{

  private auth = inject(AuthService);
  private router = inject(Router);
  
  constructor() {
    
  }
  ngOnInit(): void {
    
  }

  login() {
    let user = "Prahlad";
    let password = "Admin@123";
    this.auth.adminLogin(user, password).subscribe({
      next: (value) => {
        switch (value.status) {
          case 200:
            this.auth.setAdminToken(value.token);
            this.navigateToAdmin();
            break;
          case 400:
            alert("invalid password");
            break;
          default:
            break;
        }
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 400:
            alert("Bad Request")
            break;
          default:
            alert("Server error")
            break;
        }
      },
    })
  }

  navigateToAdmin() {
    this.router.navigateByUrl("/home/admin");
  }

}
