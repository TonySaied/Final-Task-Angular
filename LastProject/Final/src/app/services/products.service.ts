import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL: string = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}
  getAllProjects() {
    return this.http.get(this.baseURL);
  }
  getProductById(id: any) {
    return this.http.get(`${this.baseURL}/${id}`);
  }
  addProduct(product: any) {
    return this.http.post(this.baseURL, product);
  }
  deleteProduct(id: any) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  editProduct(product: any, id: any) {
    return this.http.put(`${this.baseURL}/${id}`, product);
  }
}
