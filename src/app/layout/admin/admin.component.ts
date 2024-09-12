import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { CrudService } from '../../shared/services/crud.service';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

  private crud = inject(CrudService);
  private auth = inject(AuthService);
  private router = inject(Router);
  
  constructor() {

  }
  ngOnInit(): void {
    this.getUsers();
  }

  users$!: Observable<ApiResponse<User> | null>;
  error$!: Observable<string>; // Observable property for error messages
  noUsers$!: Observable<boolean>;
  getUsers() {
    this.users$ = this.crud.getUsers().pipe(
      catchError(error => {
        this.error$ = of("An error occurred while fetching users. Please try again later.");
        return of(null)
      }),
      map(response => response?.status === 200 ? response : null)
    );

    this.noUsers$ = this.users$.pipe(
      map(response => response === null || response.data.length === 0)
    )
  }

  logout() {
    this.auth.adminLogout();
    this.router.navigateByUrl("/signin/admin")
  }

}
