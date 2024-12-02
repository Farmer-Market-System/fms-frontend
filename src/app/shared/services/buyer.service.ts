import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiBase} from '../constants/api-url';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  private apiUrl = `${apiBase}/api/buyer`;

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }

  makeOrder(order: any) {
    return this.http.post(`${this.apiUrl}/orders`, order)
  }
}
