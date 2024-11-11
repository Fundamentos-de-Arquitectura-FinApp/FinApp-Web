import {Component, computed, inject} from '@angular/core';
import {Ripple} from 'primeng/ripple';
import {StyleClassModule} from 'primeng/styleclass';
import {InputTextModule} from 'primeng/inputtext';
import {BadgeModule} from 'primeng/badge';
import {AuthService} from '../../../auth/services/auth.service';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    Ripple,
    StyleClassModule,
    InputTextModule,
    BadgeModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  authService = inject(AuthService);
  public username = computed(() => this.authService.currentUserName() );
  logout() {
    this.authService.logout();
  }
}
