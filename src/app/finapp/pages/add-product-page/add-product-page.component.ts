import {Component, inject} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import Swal from 'sweetalert2';
import {ProductInterface} from '../../interfaces/product-interface';
import {ProductsService} from '../../services/products.service';
import {UploadImageComponent} from '../../../shared/components/upload-image/upload-image.component';

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [
    ButtonDirective,
    InputTextModule,
    ReactiveFormsModule,
    Ripple,
    UploadImageComponent,
    FormsModule,
    UploadImageComponent
  ],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.css'
})
export class AddProductPageComponent {
  product: ProductInterface = {
    name: '',
    description: '',
    imageUrl: ''
  };
  private productService = inject(ProductsService)

  onImageSelected(url: string): void {
    this.product.imageUrl = url;
  }

  addProdcut(): void {
    this.productService.registerProduct(this.product).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Producto agregado exitosamente', 'success');
      },
      error: (message) => {
        Swal.fire('Error al agregar el producto', message, 'error');
      }
    });
  }
}
