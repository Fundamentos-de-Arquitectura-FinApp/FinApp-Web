import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {AuthService} from '../../../auth/services/auth.service';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    Button,
    SidebarComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
