import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, of, switchMap, throwError} from 'rxjs';
import {UserInterface} from '../interfaces/user-interface';
import {AuthStatusEnum} from '../emun/status-enum';
import {LoginResponseInterface} from '../interfaces/login-response-interface';
import {RegisterResponseInterface} from '../interfaces/register-response-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<UserInterface | null>(null);
  private _currentUserName = signal<string | null>(null);
  private _authStatus = signal<AuthStatusEnum>(AuthStatusEnum.checking);

  public authStatus = computed(() => this._authStatus());
  public currentUserName = computed(() => this._currentUserName());

  constructor() {
    this.initializeAuthStatus();
  }

  private initializeAuthStatus(): void {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token) {
      this._authStatus.set(AuthStatusEnum.authenticated);
      this._currentUserName.set(username);
    } else {
      this._authStatus.set(AuthStatusEnum.notAuthenticated);
    }
  }

  private setAuthentication(username: string, token: string): boolean {
    this._currentUserName.set(username);
    this._authStatus.set(AuthStatusEnum.authenticated);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    return true;
  }

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/authentication/sign-in`;
    const body = {username, password};
    return this.http.post<LoginResponseInterface>(url, body).pipe(
      map(({username, token}) => this.setAuthentication(username, token)),
      catchError(err => throwError(() => err.error.message))
    );
  }

  register(username: string, password: string, roles: string[]): Observable<boolean> {
    const url = `${this.baseUrl}/authentication/sign-up`;
    const body = {username, password, roles};

    return this.http.post<RegisterResponseInterface>(url, body).pipe(
      switchMap(() => this.login(username, password)),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al registrar';
        return throwError(() => errorMessage);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatusEnum.notAuthenticated);
  }
}
