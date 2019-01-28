import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PRODUCTS } from '../mock-products';
import { ProductService } from '../product.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let productService;
  let getProductsSpy;

  beforeEach(async(() => {
    productService = jasmine.createSpyObj('ProductService', ['getProducts']);
    getProductsSpy = productService.getProducts.and.returnValue( of(PRODUCTS) );
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HeroSearchComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ProductService, useValue: productService }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Products" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Top Products');
  });

  it('should call heroService', async(() => {
    expect(getProductsSpy.calls.any()).toBe(true);
    }));

  it('should display 4 links', async(() => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  }));

});
