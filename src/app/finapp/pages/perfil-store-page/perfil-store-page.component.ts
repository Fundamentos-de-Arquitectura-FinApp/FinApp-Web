import {Component, inject, OnInit} from '@angular/core';
import {DialogAddStoreComponent} from '../../components/dialog-add-store/dialog-add-store.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {Ripple} from 'primeng/ripple';
import {NgIf} from '@angular/common';
import {UploadImageComponent} from '../../../shared/components/upload-image/upload-image.component';
import {StoreInterface} from '../../interfaces/store-interface';
import {StoreService} from '../../services/store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-store-page',
  standalone: true,
  imports: [
    DialogAddStoreComponent,
    InputSwitchModule,
    FileUploadModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    Ripple,
    NgIf,
    UploadImageComponent
  ],
  templateUrl: './perfil-store-page.component.html',
  styleUrl: './perfil-store-page.component.css'
})
export class PerfilStorePageComponent implements OnInit {

  storeExistence: boolean = false;
  store: StoreInterface | null = null;
  isLoading: boolean = true;
  private storeService = inject(StoreService);

  ngOnInit() {
    this.storeExitence()
    this.storeByUser()
  }

  private storeExitence(): void {
    this.storeService.getStoreExistence().subscribe({
      next: () => {
        this.storeExistence = true;
        this.isLoading = false;
      },
      error: (message) => {
        Swal.fire('Error al verificar si existe la tienda', message, 'error').then()
        this.isLoading = false;
      }
    })
  }

  private storeByUser(): void {
    this.storeService.getStoreByUser().subscribe({
      next: (store) => {
        this.store = store;
      },
      error: (message) => {
        Swal.fire('Error al cargar los datos de la tienda', message, 'error')
      }
    })
  }

}
