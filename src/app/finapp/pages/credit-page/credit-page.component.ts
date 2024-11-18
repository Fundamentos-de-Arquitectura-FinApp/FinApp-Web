import { Component } from '@angular/core';
import {StepperModule} from 'primeng/stepper';
import { ButtonModule} from 'primeng/button';
import {PickListProductComponent} from '../../components/pick-list-product/pick-list-product.component';
import {SearchDniClientComponent} from '../../components/search-dni-client/search-dni-client.component';
import {SelectTypeCreditComponent} from '../select-type-credit/select-type-credit.component';

@Component({
  selector: 'app-credit-page',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    PickListProductComponent,
    SearchDniClientComponent,
    SelectTypeCreditComponent,

  ],
  templateUrl: './credit-page.component.html',
  styleUrl: './credit-page.component.css'
})
export class CreditPageComponent {
  isClientAllowed: boolean | null = null;
  isNextButtonEnabled: boolean = false;

  onClientCreditEligibility(isAllowed: boolean): void {
    this.isClientAllowed = isAllowed;
    this.isNextButtonEnabled = isAllowed;
  }
}
