import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiBase} from '../constants/api-url';

@Injectable({providedIn: 'root'})
export class OrderService {
  constructor(private http: HttpClient) {
  }
  private apiUrl = `${apiBase}/api/orders`;


  getOrders() {
    return this.http.get(`${this.apiUrl}`);
  }
}
