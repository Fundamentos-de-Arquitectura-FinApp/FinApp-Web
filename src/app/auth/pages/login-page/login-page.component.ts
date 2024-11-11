import {Component, inject} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {Ripple} from 'primeng/ripple';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import {DividerModule} from 'primeng/divider';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ButtonDirective,
    CheckboxModule,
    InputTextModule,
    PaginatorModule,
    Ripple,
    DividerModule,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username: string = '';
  password: string = '';


  login() {
    this.authService.login(this.username, this.password).subscribe(
      {
        next: () => this.router.navigateByUrl('/finapp'),
        error: (message) => {
          Swal.fire('Error al Iniciar Sesión', message, 'error')
        }
      }
    )
  }
}
