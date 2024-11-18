import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ProductInterface} from '../interfaces/product-interface';
import {returnHeaders} from '../../shared/models/headers';
import {StoreExistence} from '../interfaces/store-existence-interface';
import {ClientInterface} from '../interfaces/client-interface';
import {StoreInterface} from '../interfaces/store-interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() { }

  getStoreExistence(): Observable<StoreExistence> {
    const url = `${this.baseUrl}/stores/exists`;
    return this.http.get<StoreExistence>(url, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error a verificar si tienes una tienda';
        return throwError(() => errorMessage);
      })
    );
  }

  getStoreByUser(): Observable<StoreInterface> {
    const url = `${this.baseUrl}/stores/user`;

    return this.http.get<StoreInterface>(url, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al obtener los clientes';
        return throwError(() => errorMessage);
      })
    );
  }

}
