import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthLayoutComponent} from './auth/layouts/auth-layout/auth-layout.component';
import {NgIf} from '@angular/common';
import {AuthService} from './auth/services/auth.service';
import {AuthStatusEnum} from './auth/emun/status-enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthLayoutComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    console.log(this.authService.authStatus())
    return this.authService.authStatus() !== AuthStatusEnum.checking;

  });

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatusEnum.checking:
        return;
      case AuthStatusEnum.authenticated:
        const lastRoute = localStorage.getItem('lastRoute');
        if (lastRoute) {
          this.router.navigateByUrl(lastRoute);
        } else {
          this.router.navigateByUrl('/finapp');
        }
        return;
      case AuthStatusEnum.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  });

  private saveCurrentRoute(): void {
    window.onbeforeunload = () => {
      localStorage.setItem('lastRoute', this.router.url);
    };
  }

  ngOnInit(): void {
    this.saveCurrentRoute();
  }
}
