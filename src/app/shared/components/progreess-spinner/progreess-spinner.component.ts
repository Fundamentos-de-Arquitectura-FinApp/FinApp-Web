import {Component, Input} from '@angular/core';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-progreess-spinner',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './progreess-spinner.component.html',
  styleUrl: './progreess-spinner.component.css'
})
export class ProgreessSpinnerComponent {
  @Input() isLoading: boolean = true;
}
