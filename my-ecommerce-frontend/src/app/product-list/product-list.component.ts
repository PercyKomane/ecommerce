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
  product: any = {};
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


  toggleDescription(product: any): void {
    product.showFullDescription = !product.showFullDescription;
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
