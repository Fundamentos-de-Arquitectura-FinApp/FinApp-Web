import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {OrderInterface} from '../interfaces/order-interface';
import {catchError, Observable, throwError} from 'rxjs';
import {returnHeaders} from '../../shared/models/headers';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() { }

  createOrder(order:OrderInterface): Observable<OrderInterface> {
    const url = `${this.baseUrl}/orders`;

    return this.http.post<OrderInterface>(url, order, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al crear la Orden';
        return throwError(() => errorMessage);
      })
    );
  }

}
