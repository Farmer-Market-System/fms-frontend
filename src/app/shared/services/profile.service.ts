import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiBase} from '../constants/api-url';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  private apiUrl = `${apiBase}/api/user`;

  getProfile() {
    return this.http.get(`${this.apiUrl}/profile`);
  }
}
