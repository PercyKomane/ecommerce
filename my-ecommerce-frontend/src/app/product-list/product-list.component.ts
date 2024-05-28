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
  selectedFile: File | null = null;

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

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  addProduct(): void {
    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('description', this.newProduct.description);
    formData.append('price', this.newProduct.price);
    formData.append('category', this.newProduct.category);
    formData.append('quantity_available', this.newProduct.quantity_available);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.addProduct(formData).subscribe(
      (response: any) => {
        this.products.push(response);
        this.newProduct = {};
        this.selectedFile = null;
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
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('quantity_available', product.quantity_available);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.updateProduct(product.id, formData).subscribe(
      (response: any) => {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index] = response;
        }
        this.editingProductId = null;
        this.selectedFile = null;
      },
      (error: any) => {
        console.error('Error updating product:', error);
      }
    );
  }

  deleteImage(product: any): void {
    product.image = null;
    this.updateProduct(product);
  }

  cancelEdit(): void {
    this.editingProductId = null;
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== productId);
      },
      (error: any) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  fetchProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (response: any) => {
        this.product = response;
      },
      (error: any) => {
        console.error('Error fetching product:', error);
      }
    );
  }
}
