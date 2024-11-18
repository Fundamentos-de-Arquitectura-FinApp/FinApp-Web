import { Component } from '@angular/core';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-table-preview-credit',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './table-preview-credit.component.html',
  styleUrl: './table-preview-credit.component.css'
})
export class TablePreviewCreditComponent {
  creditPreview: CreditInterface[]  = [];

}
