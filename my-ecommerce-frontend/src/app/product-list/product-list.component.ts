// product-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  newProduct: any = {};
  editingProductId: number | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  toggleDescription(product: any): void {
    product.showFullDescription = !product.showFullDescription;
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(
      (response: any) => {
        this.products.push(response);
        this.newProduct = {};
      },
      (error: any) => {
        console.error('Error adding product:', error);
      }
    );
  }

  editProduct(productId: number): void {
    this.editingProductId = productId;
  }

  updateProduct(product: any): void {
    this.productService.updateProduct(product.id, product).subscribe(
      (response: any) => {
        // Update product in the list
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index] = response;
        }
        this.editingProductId = null;
      },
      (error: any) => {
        console.error('Error updating product:', error);
      }
    );
  }

  cancelEdit(): void {
    this.editingProductId = null;
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        // Remove the deleted product from the list
        this.products = this.products.filter(p => p.id !== productId);
      },
      (error: any) => {
        console.error('Error deleting product:', error);
      }
    );
  }
}
