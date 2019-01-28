import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [];
    
    /* Init default product list*/
    products.push(this.generateProduct(1, 100));
    products.push(this.generateProduct(2, 12, "Floor 2"));
    products.push(this.generateProduct(3, 1, "Floor 1", "Section 1"));
    products.push(this.generateProduct(4, 55, "Floor 2", "Section 2"));
    products.push(this.generateProduct(5, 24, "Floor 2", "Section 3"));
    products.push(this.generateProduct(6, 5, "Floor 3", "Section 3"));

    return {products};
  }

  // Overrides the genId method to ensure that a product always has an id.
  // If the products array is empty,
  // the method below returns the initial number (11).
  // if the products array is not empty, the method below returns the highest
  // product id + 1.
  genProductId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }

  //Private methods
  generateProduct(id: number = 0, quantity: number = 0, floor: string = "Floor 1", section: string = "Section 1"): Product { 
    return {id: id, code: this.generateProductCode(), quantity: quantity, floor: floor, section: section};
  }

  generateProductCode(): string {
    return this.generateRandomText() + " " + this.generateRandomNumber();
  }

  generateRandomText(): string {
    var text = "";
    var possibleChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var textLength = this.getNumberLength(2, 5);
    
    for(var i = 0; i < textLength; i++) {
        text += possibleChar.charAt(Math.floor(Math.random() * possibleChar.length));
    }
    
    return text;
  }

  generateRandomNumber(): number {
    var numberLength = this.getNumberLength(4, 7);
    return this.randomFixedInteger(numberLength);
  }

  randomFixedInteger(length: number): number { 
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
  }

  getNumberLength(min: number, max: number): number { 
    let random_number = Math.random() * (max-min) + min; 
    return Math.floor(random_number);
  }
}
