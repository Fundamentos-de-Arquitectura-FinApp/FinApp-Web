import {Component, inject} from '@angular/core';
import {Button, ButtonDirective} from 'primeng/button';
import {AuthService} from '../../../auth/services/auth.service';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {Ripple} from 'primeng/ripple';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    Button,
    SidebarComponent,
    ButtonDirective,
    Ripple,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
