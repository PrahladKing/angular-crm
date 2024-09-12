import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AdminResponse } from '../models/user/admin-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = "http://localhost:8081/api"
  private http = inject(HttpClient);
  
  constructor() { }

  // For admin
  isAdminLoggedIn() {
    return !!this.getAdminToken();
  }

  getAdminToken() {
    return localStorage.getItem("adminToken") ?? "";
  }

  setAdminToken(token: string) {
    localStorage.setItem("adminToken", token);
  }

  clearAdminToken() {
    localStorage.removeItem("adminToken");
  }

  adminLogin(user: string, password: string) {
    return this.http.post<AdminResponse>(`${this.api}/login/admin`, {user, password});
  }

  adminLogout() {
    this.clearAdminToken();
  }

}
