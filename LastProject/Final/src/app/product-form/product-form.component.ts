import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productId: any;
  product: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productServices: ProductService
  ) {}
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productServices.getProductById(this.productId).subscribe({
      next: (response) => {
        this.product = response;
        this.getProductName.setValue(this.product.productName);
        this.getProductPrice.setValue(this.product.price);
        this.getProductQuantity.setValue(this.product.quantity);
      },
      error: () => {},
    });
  }
  productForm = new FormGroup({
    productName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(10)]),
    quantity: new FormControl('', [Validators.required]),
  });
  get getProductName() {
    return this.productForm.controls['productName'];
  }
  get getProductPrice() {
    return this.productForm.controls['price'];
  }
  get getProductQuantity() {
    return this.productForm.controls['quantity'];
  }
  submitForm(e: any) {
    e.preventDefault();
    //console.log(this.productForm);
    if (this.productForm.status == 'VALID') {
      //console.log(this.getProductName.errors);
      if (this.productId == 0) {
        this.productServices.addProduct(this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/Products']);
          },
        });
      }
    } else {
      console.log('errors');
      this.productServices
        .editProduct(this.productId, this.productForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/Products']);
          },
        });
    }
  }
}
