// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/products/';

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Get a single product by ID
  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${productId}/`);
  }

  // Add a new product
  addProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData);
  }

  // Update an existing product
  updateProduct(productId: number, productData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${productId}/`, productData);
  }

  // Delete a product
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${productId}/`);
  }
}
