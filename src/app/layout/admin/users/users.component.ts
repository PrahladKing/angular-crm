import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response';
import { User } from '../../../shared/models/user';
import { CrudService } from '../../../shared/services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  private crud = inject(CrudService);
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

  goToCreteUser() {
    this.router.navigate(['/home/admin/user/new/edit'])
  }

  viewUser(id: number) {
  }
  
  editUser(id: number) {
    this.router.navigate(['/home/admin/user', id, "edit"])
  }
}