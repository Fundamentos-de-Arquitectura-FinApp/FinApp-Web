import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ProductInterface} from '../interfaces/product-interface';
import {catchError, Observable, throwError} from 'rxjs';
import {returnHeaders} from '../../shared/models/headers';
import {AccountInterface} from '../interfaces/account-interface';
import {ClientInterface} from '../interfaces/client-interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  constructor() { }

  openAccount(clientId : number, creditLine: number): Observable<AccountInterface> {
    const url = `${this.baseUrl}/accounts/${clientId}`;

    return this.http.post<AccountInterface>(url, {creditLine}, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(clientId, creditLine);
        const errorMessage = error.error?.message || 'Error inesperado por lado del servidor al aperturar la cuenta';
        return throwError(() => errorMessage);
      })
    );
  }
}
