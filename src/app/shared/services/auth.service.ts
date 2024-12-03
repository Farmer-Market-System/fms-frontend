import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {apiBase} from '../constants/api-url';

@Injectable({providedIn: 'root'})
export class AuthService {
  httpClient = inject(HttpClient)
  baseUrl = apiBase


  register(data: any, userType: string) {
    return this.httpClient.post(`${this.baseUrl}/api/auth/register/${userType}`, data)
  }

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/api/auth/login`, data).pipe(tap((result: any) => {
      localStorage.setItem('accessToken', result['accessToken']);
      localStorage.setItem('role', result['role'])
    }))
  }

  loginAdmin(data: any) {
    return this.httpClient.post(`${this.baseUrl}/api/auth/admin/login`, data).pipe(tap((result: any) => {
      localStorage.setItem('accessToken', result['accessToken'])
    }))
  }

  isLoggedIn() {
    return localStorage.getItem('accessToken') !== null;
  }

  getUserRole(): string {
    return localStorage.getItem('role') || 'user';
  }

  recoverPassword(email: string) {
    return this.httpClient.post(`${this.baseUrl}/api/auth/password-recovery`, {email})
  }

  resetPassword(recoverToken: string, newPassword: string) {
    return this.httpClient.post(`${this.baseUrl}/api/auth/reset-password`, {recoverToken, newPassword});
  }
}
