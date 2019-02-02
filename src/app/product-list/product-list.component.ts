import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Floor } from '../models/floor';
import { Section } from '../models/section';
import { FloorService } from '../services/floor.service';
import { SectionService } from '../services/section.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: [ './product-list.component.css']
})

export class ProductListComponent implements OnInit {
    errorMessage: string;
    pageTitle: string = 'Product List';
    filteredProducts: Product[];
    products: Product[] = [];
    floors: Floor[] = [];
    sections: Section[];

    _productFilter: string;
    get productFilter(): string {
        return this._productFilter;
    }
    set productFilter(value: string) {
        this._productFilter = value;
        this.filteredProducts = this.productFilter 
            ? this.performFilter(this.productFilter, 'code') 
            : this.products;
    }

    constructor(private productService: ProductService,
                private floorService: FloorService,
                private sectionService: SectionService) { }

    performFilter(filterValue: any, filterBy: string): Product[] {
        filterBy = filterBy.toLocaleLowerCase();
        switch (filterBy) {
            case 'code':
                let filterCode: string = filterValue.toLocaleLowerCase();
                return this.products.filter((product: Product) => 
                    product.code.toLocaleLowerCase().indexOf(filterCode) !== -1);
            case 'floor':
                let filterFloor: number = <number>filterValue;
                return this.products.filter((product: Product) => 
                    product.floor.id == filterFloor);
            case 'section':
                let filterSection: number = <number>filterValue;
                return this.products.filter((product: Product) => 
                    product.section.id == filterSection);        
            default:
                return this.products;
        }
    }

    filterFloor(floorId: number): void {
        this.filteredProducts = this.performFilter(floorId, 'floor');
    }

    filterSection(sectionId: number): void {
        this.filteredProducts = this.performFilter(sectionId, 'section');
    }
    
    ngOnInit(): void {
        console.log(' In OnInit ');
        this.productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error
        );

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

        this._productFilter = '';
    }
}