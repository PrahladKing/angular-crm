import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AdminResponse } from '../models/user/admin-response';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = "http://localhost:8081/api"
  private http = inject(HttpClient);
  private router = inject(Router);

  private storage: Storage | null;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    this.storage = isPlatformBrowser(this.platformId) ? localStorage : null;
  }

  getItem(key: string): string | null {
    return this.storage ? this.storage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.storage) {
      this.storage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }
  
  // For admin
  isAdminLoggedIn() {
    return !!this.getAdminToken();
  }

  getAdminToken() {
    return this.getItem("adminToken") ?? "";
  }

  setAdminToken(token: string) {
    this.setItem("adminToken", token);
  }

  clearAdminToken() {
    this.removeItem("adminToken");
  }

  adminLogin(user: string, password: string) {
    return this.http.post<AdminResponse>(`${this.api}/login/admin`, {user, password});
  }

  adminLogout() {
    this.clearAdminToken();
    this.router.navigateByUrl("/signin/admin")
  }

}
