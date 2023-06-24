import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IProduct } from '../models/IProduct';
import { ProductsList } from '../models/ProductsList';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  products: any; /*IProduct[] = ProductsList;
  productName?: string = '';
  productPrice?: number;
  productQuantity?: number;*/
  productId: any;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');

    /*this.products.filter((n) => n.id == this.productId);
    this.productName = this.products.find(
      (n) => n.id == this.productId
    )?.productName;
    this.productQuantity = this.products.find(
      (n) => n.id == this.productId
    )?.quantity;
    this.productPrice = this.products.find(
      (n) => n.id == this.productId
    )?.price;*/
  }
  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  BackHome() {
    this.router.navigate(['/Products']);
  }
}
