import {Component, inject, OnInit} from '@angular/core';
import {CardClientComponent} from '../../components/card-client/card-client.component';
import {NgForOf, NgIf} from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import {CardProductComponent} from '../../components/card-product/card-product.component';
import Swal from 'sweetalert2';
import {ProductsService} from '../../services/products.service';
import {ProductInterface} from '../../interfaces/product-interface';
import {ProgreessSpinnerComponent} from '../../../shared/components/progreess-spinner/progreess-spinner.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    CardClientComponent,
    NgForOf,
    PaginatorModule,
    CardProductComponent,
    ProgreessSpinnerComponent,
    NgIf
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  private productService = inject(ProductsService);
  products: ProductInterface[] = [];
  paginatedProducts: ProductInterface[] = [];
  isLoading: boolean = true;

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProductsByStore().subscribe({
      next: (products) => {
        this.products = products;
        this.updatePaginatedProducts(0);  // Actualizamos los productos paginados
        this.isLoading = false;  // Desactivamos el cargando después de cargar los productos
      },
      error: (message) => {
        Swal.fire('Error al cargar los productos', message, 'error');
        this.isLoading = false;  // También desactivamos el cargando si ocurre un error
      }
    });
  }

  onPageChange(event: any) {
    this.updatePaginatedProducts(event.first);
  }

  private updatePaginatedProducts(startIndex: number): void {
    const endIndex = startIndex + 8;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }
}
