import {Component, inject, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {Ripple} from "primeng/ripple";
import {DividerModule} from 'primeng/divider';
import {PaginatorModule} from 'primeng/paginator';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {RoleEnum} from '../../emun/role-enum';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ButtonDirective,
    CheckboxModule,
    InputTextModule,
    DropdownModule,
    Ripple,
    DividerModule,
    PaginatorModule,
    RouterLink,

  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  username: string = '';
  password: string = '';
  roles: { label: string; value: RoleEnum }[] = [];
  selectedRole: RoleEnum | null = null;

  ngOnInit() {
    this.roles = [
      {label: 'Negocio', value: RoleEnum.store},
      {label: 'Cliente', value: RoleEnum.client}
    ];
  }

  register() {
    if (!this.username || !this.password || !this.selectedRole) {
      Swal.fire('Error', 'Por favor completa todos los campos', 'warning');
      return;
    }

    this.authService.register(this.username, this.password, [this.selectedRole]).subscribe({
      next: () => {
        Swal.fire('Registro exitoso', 'Usuario registrado con éxito', 'success').then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        const errorMessage = typeof error === 'string' ? error : 'Ocurrió un error inesperado.';
        Swal.fire('Error al Registrar', errorMessage, 'error');
      }
    });
  }

}
