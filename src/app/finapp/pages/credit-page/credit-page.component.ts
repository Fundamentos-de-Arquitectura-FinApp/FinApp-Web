import { Component } from '@angular/core';
import {StepperModule} from 'primeng/stepper';
import { ButtonModule} from 'primeng/button';
import {PickListProductComponent} from '../../components/pick-list-product/pick-list-product.component';



@Component({
  selector: 'app-credit-page',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    PickListProductComponent,
  ],
  templateUrl: './credit-page.component.html',
  styleUrl: './credit-page.component.css'
})
export class CreditPageComponent {

}
