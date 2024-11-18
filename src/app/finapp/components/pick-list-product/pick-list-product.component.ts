import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {PickListModule} from 'primeng/picklist';
import {ProductInterface} from '../../interfaces/product-interface';
import {ProductsService} from '../../services/products.service';
import {Button} from 'primeng/button';
import {OrdersService} from '../../services/orders.service';
import {OrderInterface} from '../../interfaces/order-interface';
import {ClientsService} from '../../services/clients.service';
import Swal from 'sweetalert2';
import {ItemInterface} from '../../interfaces/item-interface';

@Component({
  selector: 'app-pick-list-product',
  standalone: true,
  imports: [
    PickListModule,
    Button,
  ],
  templateUrl: './pick-list-product.component.html',
  styleUrl: './pick-list-product.component.css'
})
export class PickListProductComponent implements OnInit {
  sourceProducts: ProductInterface[] = [];
  targetProducts: ProductInterface[] = [];
  clientId: number | null = null;
  totalPrice: number | undefined = 0;

  private productService = inject(ProductsService);
  private orderService = inject(OrdersService)
  private clientService = inject(ClientsService);

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.resetSelection();
    this.loadSelectedProducts();
    this.clientService.clientId$.subscribe((clientId) => {
      this.clientId = clientId;
    });
  }

  protected getAllProducts(): void {
    this.productService.getProductsByStore().subscribe(
      products => {
        this.sourceProducts = products;
        this.cdr.markForCheck();
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }

  createOrder(): void {
    if (!this.clientId) {
      Swal.fire('Error al crear la orden', 'Por favor, selecciona un cliente antes de continuar.', 'error');
      return;
    }

    const items: ItemInterface[] = this.targetProducts.map((product) => ({
      productId: product.id!,
      quantity: product.quantity || 1,
    }));

    const order: OrderInterface = {
      clientId: this.clientId,
      items,
    };

    this.orderService.createOrder(order).subscribe(
      (response) => {
        this.resetSelection();
        this.saveSelectedProducts();
        Swal.fire('Éxito', 'La orden fue creada correctamente.', 'success');
      },
      (error) => {
        Swal.fire('Error al crear la orden', 'Hubo un problema al procesar la solicitud. Inténtalo nuevamente.', 'error');
        console.error('Error al crear la orden:', error);
      }
    );
  }


  protected resetSelection(): void {
    this.targetProducts = [];
    this.totalPrice = 0;
  }

  protected loadSelectedProducts(): void {
    const savedProducts = localStorage.getItem('selectedProducts');
    const savedTotalPrice = localStorage.getItem('totalPrice');

    if (savedProducts) {
      this.targetProducts = JSON.parse(savedProducts);
    }

    if (savedTotalPrice) {
      this.totalPrice = parseFloat(savedTotalPrice);
    }
  }

  protected saveSelectedProducts(): void {
    localStorage.setItem('selectedProducts', JSON.stringify(this.targetProducts));
    localStorage.setItem('totalPrice', this.totalPrice?.toString() || '0');
  }

  onMoveToTarget(event: any): void {
    const addedProducts = event.items;
    addedProducts.forEach((product: ProductInterface) => {
      // @ts-ignore
      this.totalPrice += product.price;
      product.quantity = product.quantity || 1;
    });
    this.updateTotalPrice();
    this.saveSelectedProducts();
  }

  onMoveToSource(event: any): void {
    const removedProducts = event.items;
    removedProducts.forEach((product: ProductInterface) => {
      this.totalPrice! -= (product.price || 0) * (product.quantity || 1);
    });
    this.updateTotalPrice();
    this.saveSelectedProducts();
  }

  private updateTotalPrice(): void {
    this.totalPrice = parseFloat(this.totalPrice?.toFixed(3) || '0');
  }


}
