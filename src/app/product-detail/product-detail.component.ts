import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  @Input() product: Product;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    let id  = +this.route.snapshot.paramMap.get('id');

    this.pageTitle += ` : ${id}`;

    this.getProduct(id);
  }

  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
