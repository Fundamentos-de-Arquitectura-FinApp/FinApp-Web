import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {ClientsService} from '../../services/clients.service';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {AutoCompleteCompleteEvent} from '../../interfaces/auto-complete-complete-event';
import {NgClass, NgIf} from '@angular/common';
import {ClientInterface} from '../../interfaces/client-interface';

@Component({
  selector: 'app-search-dni-client',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './search-dni-client.component.html',
  styleUrl: './search-dni-client.component.css'
})
export class SearchDniClientComponent {
  @Output() isAllowedCredit = new EventEmitter<boolean>();
  @Output() accountId = new EventEmitter<number>();
  message: string = '';
  filteredClients: any[] = [];
  private clientService = inject(ClientsService);
  errorMessage: string = '';

  get dni(): string {
    return this.clientService.dni;
  }

  set dni(value: string) {
    this.clientService.dni = value;
    if (value.trim() === '') {
      this.isAllowedCredit.emit(false);
    }
  }

  constructor() {
  }

  filterClient(event: AutoCompleteCompleteEvent) {
    const query = event.query.trim();

    if (query.length !== 8) {
      this.errorMessage = 'El DNI debe tener exactamente 8 caracteres.';
      this.filteredClients = [];
      this.clientService.setClientId(null);
      this.isAllowedCredit.emit(false);
      this.message = '';
      return;
    } else {
      this.errorMessage = '';
    }

    this.clientService.getClientByDni(query).subscribe(
      (client) => {
        if (client) {
          this.filteredClients = [client];
          this.clientService.setClientId(client.id);
          this.clientService.setAccountId(client.accountId!);
          this.checkCreditEligibility(client.dni);
        } else {
          this.filteredClients = [];
          this.clientService.setClientId(null);
          this.isAllowedCredit.emit(false);
        }
      },
      (error) => {
        console.error("Error al obtener cliente por DNI:", error);
        this.filteredClients = [];
        this.clientService.setClientId(null);
        this.isAllowedCredit.emit(false);
      }
    );
  }

  checkCreditEligibility(dni: string): void {
    this.clientService.isAllowedCreditClient(dni).subscribe({
      next: (isAllowed) => {
        this.isAllowedCredit.emit(isAllowed);
        this.message = isAllowed
          ? 'El cliente es apto para crédito.'
          : 'El cliente no es apto para crédito.';
      },
      error: (error) => {
        console.error('Error al verificar el crédito:', error.message);
        this.message = 'No se pudo verificar si el cliente es apto para crédito.';
        this.isAllowedCredit.emit(false);
      }
    });
  }
}
