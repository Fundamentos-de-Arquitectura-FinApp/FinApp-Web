import {Component, inject} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {PrimeTemplate} from 'primeng/api';
import {Ripple} from 'primeng/ripple';

import {ClientInterface} from '../../interfaces/client-interface';
import {ClientsService} from '../../services/clients.service';
import Swal from 'sweetalert2';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {NgIf} from '@angular/common';
import {UploadImageComponent} from '../../../shared/components/upload-image/upload-image.component';

@Component({
  selector: 'app-add-client-page',
  standalone: true,
  imports: [
    ButtonDirective,
    FormsModule,
    InputTextModule,
    PrimeTemplate,
    ReactiveFormsModule,
    Ripple,
    DropdownModule,
    InputTextareaModule,
    NgIf,
    UploadImageComponent
  ],
  templateUrl: './add-client-page.component.html',
  styleUrl: './add-client-page.component.css'
})
export class AddClientPageComponent {
  client: ClientInterface = {
    id:0,
    email: '',
    names: '',
    paternalSurname: '',
    maternalSurname: '',
    dni: '',
    phone: '',
    photo: ''
  };
  private clientService = inject(ClientsService)

  onImageSelected(url: string): void {
    this.client.photo = url;
  }

  addClient(): void {
    this.clientService.registerClient(this.client).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Cliente agregado exitosamente', 'success');
      },
      error: (message) => {
        Swal.fire('Error al agregar el cliente', message, 'error');
      }
    });
  }
}
