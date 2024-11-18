import {Component, inject, Input, numberAttribute, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {PrimeTemplate} from 'primeng/api';
import {Ripple} from 'primeng/ripple';
import {UploadImageComponent} from '../../../shared/components/upload-image/upload-image.component';
import {AccountService} from '../../services/account.service';
import {ClientInterface} from '../../interfaces/client-interface';
import Swal from 'sweetalert2';
import {AccountInterface} from '../../interfaces/account-interface';

@Component({
  selector: 'app-dialog-open-credit-limit',
  standalone: true,
  imports: [
    ButtonDirective,
    DialogModule,
    FormsModule,
    InputTextModule,
    PaginatorModule,
    PrimeTemplate,
    Ripple,
    UploadImageComponent
  ],
  templateUrl: './dialog-open-credit-limit.component.html',
  styleUrl: './dialog-open-credit-limit.component.css'
})
export class DialogOpenCreditLimitComponent {
  @Input({transform: numberAttribute}) clientId: number | null = null;
  visibleFormStore: boolean = false;

  protected account: AccountInterface = {
    accountId: 0,
    creditLine: 0,
    dni: "",
    storeName: "",
    storeRuc: "",
  };
  private accountService = inject(AccountService);

  openDialog() {
    this.visibleFormStore = true;
  }

  openAccount(): void {
    this.accountService.openAccount(this.clientId!, this.account.creditLine).subscribe({
      next: () => {
        this.visibleFormStore = false;
      },
      error: (message) => {
        Swal.fire('Error al aperturar la cuenta', message, 'error');
        this.visibleFormStore = false;
      }
    });

  }
}
