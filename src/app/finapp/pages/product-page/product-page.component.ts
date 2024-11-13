import {Component, inject, OnInit} from '@angular/core';
import {CardClientComponent} from '../../components/card-client/card-client.component';
import {NgForOf} from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import {CardProductComponent} from '../../components/card-product/card-product.component';
import {ClientInterface} from '../../interfaces/client-interface';
import Swal from 'sweetalert2';
import {ProductsService} from '../../services/products.service';
import {ProductInterface} from '../../interfaces/product-interface';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    CardClientComponent,
    NgForOf,
    PaginatorModule,
    CardProductComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  private productService = inject(ProductsService)
  products: ProductInterface[] = [];
  paginatedProducts: ProductInterface[] = [];

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProductsByStore().subscribe({
      next: (products) => {
        this.products = products;
        this.updatePaginatedClients(0);
      },
      error: (message) => {
        Swal.fire('Error al cargar los productos', message, 'error')
      }
    })
  }

  onPageChange(event: any) {
    this.updatePaginatedClients(event.first);
  }

  private updatePaginatedClients(startIndex: number): void {
    const endIndex = startIndex + 8;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }
}
