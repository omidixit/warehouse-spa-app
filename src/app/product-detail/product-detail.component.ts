import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Floor } from '../models/floor';
import { Section } from '../models/section';
import { FloorService } from '../services/floor.service';
import { SectionService } from '../services/section.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forbiddenCodeValidator } from '../validators/forbidden-code.directive';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  errorMessage: string;
  pageTitle: string = 'Product Detail';
  @Input() product: Product;
  floors: Floor[] = [];
  sections: Section[];
  productForm: FormGroup;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private productService: ProductService,
              private floorService: FloorService,
              private sectionService: SectionService) { }

  ngOnInit() {
    let id  = +this.route.snapshot.paramMap.get('id');

    this.pageTitle += ` : ${id}`;

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

  intiProductForm(): void {
    this.productForm = new FormGroup({
      'code': new FormControl(this.product.code, [
        Validators.required,
        Validators.minLength(4),
        forbiddenCodeValidator(/bob/i)
      ]),
      'quantity': new FormControl(this.product.quantity, Validators.required),
      'floor': new FormControl(this.product.floor, Validators.required),
      'section': new FormControl(this.product.section, Validators.required)
    }); // <-- add custom validator at the FormGroup level
  }

  get code() { return this.productForm.get('code'); }

  get floor() { return this.productForm.get('floor'); }

  get section() { return this.productForm.get('section'); }

  get quantity() { return this.productForm.get('quantity'); }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe(
      product => {
        this.product = product;
        //this.product = { id: 1, code: 'ABC 1234', quantity: 100, floor: this.floors[0], section: this.sections[0] };
        this.intiProductForm();
      });
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.productForm.value);
  }
}
