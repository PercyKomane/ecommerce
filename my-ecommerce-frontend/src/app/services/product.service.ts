import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<any[]>('http://localhost:8000/api/products/'); // Replace with your Django API URL
  }

  getProductById(productId: number) {
    return this.http.get<any>(`http://localhost:8000/api/products/${productId}/`);
  }

  // Implement other API calls as needed
}
