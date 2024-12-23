import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {apiBase} from '../constants/api-url';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  private apiUrl = `${apiBase}/api/farmer`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, formData);
  }

  editProduct(productId: string, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${productId}`, updateData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }
}
