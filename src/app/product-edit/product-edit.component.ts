import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { NgForm } from '@angular/forms';
import { Floor } from '../models/floor';
import { Section } from '../models/section';
import { ProductService } from '../services/product.service';
import { FloorService } from '../services/floor.service';
import { SectionService } from '../services/section.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  errorMessage: string;
  pageTitle: string = 'Edit Product (Template driven)';
  product: Product = new Product();
  floors: Floor[] = [];
  sections: Section[];
  
  constructor(private router: Router,
    private route: ActivatedRoute, 
    private productService: ProductService,
    private floorService: FloorService,
    private sectionService: SectionService) { }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe(
      product => {
        this.product = product;
      });
  }

  ngOnInit() {
    let id  = +this.route.snapshot.paramMap.get('id');

    //this.pageTitle += ` : ${id}`;

    this.floorService.getFloors().subscribe(
        floors => {
            this.floors = floors;
        },
        error => this.errorMessage = <any>error
    );

    this.sectionService.getSections().subscribe(
        sections => {
            this.sections = sections;
        },
        error => this.errorMessage = <any>error
    );

    this.getProduct(id);
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
  save(productForm: NgForm) {
    console.log(productForm.form);
    console.log('Saved: ' + JSON.stringify(productForm.value));
  }
}
