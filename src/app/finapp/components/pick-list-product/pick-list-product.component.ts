import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {PickListModule} from 'primeng/picklist';
import {ProductInterface} from '../../interfaces/product-interface';
import {ProductsService} from '../../services/products.service';
import {DragDropModule} from 'primeng/dragdrop';

@Component({
  selector: 'app-pick-list-product',
  standalone: true,
  imports: [
    PickListModule
  ],
  templateUrl: './pick-list-product.component.html',
  styleUrl: './pick-list-product.component.css'
})
export class PickListProductComponent {
}
