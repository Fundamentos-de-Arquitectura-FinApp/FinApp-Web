import { Component } from '@angular/core';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-finapp-page',
  standalone: true,
  imports: [
    SidebarComponent,
  ],
  templateUrl: './finapp-page.component.html',
  styleUrl: './finapp-page.component.css'
})
export class FinappPageComponent {

}
