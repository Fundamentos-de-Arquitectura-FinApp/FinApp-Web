import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ClientInterface} from '../interfaces/client-interface';
import {catchError, Observable, throwError} from 'rxjs';
import {returnHeaders} from '../../shared/models/headers';
import {ProductInterface} from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {
  }

  registerProduct(product: ProductInterface): Observable<ProductInterface> {
    const url = `${this.baseUrl}/products/store`;

    return this.http.post<ProductInterface>(url, product, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al registrar el producto';
        return throwError(() => errorMessage);
      })
    );
  }

  getProductsByStore(): Observable<ProductInterface[]> {
    const url = `${this.baseUrl}/products/store`;

    return this.http.get<ProductInterface[]>(url, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al obtener los productos';
        return throwError(() => errorMessage);
      })
    );
  }

}
