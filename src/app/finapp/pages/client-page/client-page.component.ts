import {Component, inject, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {ClientInterface} from '../../interfaces/client-interface';
import {ClientsService} from '../../services/clients.service';
import Swal from 'sweetalert2';
import {NgForOf} from '@angular/common';
import {CardClientComponent} from '../../components/card-client/card-client.component';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple,
    NgForOf,
    CardClientComponent,
    PaginatorModule
  ],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css'
})
export class ClientPageComponent implements OnInit {
  private clientService = inject(ClientsService)
  clients: ClientInterface[] = [];
  paginatedClients: ClientInterface[] = [];

  ngOnInit() {
    this.loadClients();
  }

  private loadClients(): void {
    this.clientService.getClientByStore().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.updatePaginatedClients(0);
      },
      error: (message) => {
        Swal.fire('Error al cargar los clientes', message, 'error')
      }
    })
  }

  onPageChange(event: any) {
    this.updatePaginatedClients(event.first);
  }

  private updatePaginatedClients(startIndex: number): void {
    const endIndex = startIndex + 8;
    this.paginatedClients = this.clients.slice(startIndex, endIndex);
  }
}
