import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {returnHeaders} from '../../shared/models/headers';
import {CreditInterface} from '../interfaces/credit-interface';

@Injectable({
  providedIn: 'root'
})
export class CreditsService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {
  }

  createQuotaCredit(accountId: number, credit: CreditInterface): Observable<CreditInterface> {
    const url = `${this.baseUrl}/credits/quota-credit/${accountId}`;

    return this.http.post<CreditInterface>(url, credit, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al crear el crédito de Anualidades';
        return throwError(() => errorMessage);
      })
    );
  }

  previewQuotaCredit(credit: CreditInterface): Observable<CreditInterface> {
    const url = `${this.baseUrl}/credits/quota-credit/preview`;

    return this.http.post<CreditInterface>(url, credit, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al previsualizar el crédito de Anualidades';
        return throwError(() => errorMessage);
      })
    );
  }

  createOnePaymentCredit(accountId: number, credit: CreditInterface): Observable<CreditInterface> {
    const url = `${this.baseUrl}/credits/one-payment-credit/${accountId}`;

    return this.http.post<CreditInterface>(url, credit, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al crear el crédito de Valor Futuro';
        return throwError(() => errorMessage);
      })
    );
  }

  previewOnePaymentCredit(credit: CreditInterface): Observable<CreditInterface> {
    const url = `${this.baseUrl}/credits/one-payment-credit/preview`;

    return this.http.post<CreditInterface>(url, credit, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al previsualizar el crédito de Valor Futuro';
        return throwError(() => errorMessage);
      })
    );
  }


}
