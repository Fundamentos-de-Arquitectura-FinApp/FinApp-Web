import {Component, Input, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {ClientInterface} from '../../interfaces/client-interface';

@Component({
  selector: 'app-card-client',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple
  ],
  templateUrl: './card-client.component.html',
  styleUrl: './card-client.component.css'
})
export class CardClientComponent {
  @Input() clientCard: ClientInterface | null = null;
}
