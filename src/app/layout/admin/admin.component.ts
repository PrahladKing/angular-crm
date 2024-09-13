import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

  private auth = inject(AuthService);
  private router = inject(Router);
  
  constructor() {

  }
  ngOnInit(): void {

  }

  logout() {
    this.auth.adminLogout();
    this.router.navigateByUrl("/signin/admin")
  }

}
