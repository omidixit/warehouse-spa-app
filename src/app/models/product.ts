import { Floor } from './floor';
import { Section } from './section';

export class Product {
    id: number;
    code: string;
    quantity: number;
    floor: Floor;
    section: Section;
  }