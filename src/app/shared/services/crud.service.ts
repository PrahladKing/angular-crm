import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { ApiResponse } from '../models/api-response';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private api = "http://localhost:8080/api"
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  
  private get headers(): HttpHeaders {
    const token = this.auth.getAdminToken();
   return new HttpHeaders({
     'Authorization': `Bearer ${token}`
   })
  }
  
  constructor() { }

  getUsers() {
    return this.http.get<ApiResponse<User>>(`${this.api}/user`, {headers: this.headers});;
  }

  createUser(user: User) {
    return this.http.post<{status: number, message: string}>(`${this.api}/user`, user, {headers: this.headers})
  }

  getUser(id: number) {
    return this.http.get<{status: number, message: string, user: User}>(`${this.api}/user/${id}`, {headers: this.headers})
  }

}
