import { ProductService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { ProductsList } from '../models/ProductsList';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  /**
   *
   */
  productId: any;
  products: any; //IProduct[] = ProductsList;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productServices: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productServices.getAllProjects().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: () => {
        console.log('Error');
      },
    });
  }
  Delete(i: number) {
    let choice = confirm('Are you sure?');
    if (choice == true) {
      this.productServices.deleteProduct(i).subscribe({
        next: () => {
          this.productServices.getAllProjects().subscribe({
            next: (response) => {
              this.products = response;
            },
            error: () => {
              console.log('Error');
            },
          });
        },
      });
    }
    console.log(this.productId);
  }

  /*remove(i: number) {
    this.products = this.products.filter((item, index) => index != i);
    console.log(this.products);
  }*/
}
