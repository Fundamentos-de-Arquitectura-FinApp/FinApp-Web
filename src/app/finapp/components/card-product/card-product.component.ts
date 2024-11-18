import {Component, Input} from '@angular/core';
import {ClientInterface} from '../../interfaces/client-interface';
import {ProductInterface} from '../../interfaces/product-interface';
import {SlicePipe} from '@angular/common';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [
    SlicePipe
  ],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() productCard: ProductInterface | null = null;
}
