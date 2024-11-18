import {Component, Input, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {ClientInterface} from '../../interfaces/client-interface';
import {DialogOpenCreditLimitComponent} from '../dialog-open-credit-limit/dialog-open-credit-limit.component';

@Component({
  selector: 'app-card-client',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple,
    DialogOpenCreditLimitComponent
  ],
  templateUrl: './card-client.component.html',
  styleUrl: './card-client.component.css'
})
export class CardClientComponent {
  @Input() clientCard: ClientInterface | null = null;
}
