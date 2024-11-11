import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, Observable, throwError} from 'rxjs';
import {ClientInterface} from '../interfaces/client-interface';
import {returnHeaders} from '../../shared/models/headers';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {
  }

  registerClient(client: ClientInterface): Observable<ClientInterface> {
    const url = `${this.baseUrl}/clients`;

    return this.http.post<ClientInterface>(url, client, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al registrar al cliente';
        return throwError(() => errorMessage);
      })
    );
  }

  getClientByStore(): Observable<ClientInterface[]> {
    const url = `${this.baseUrl}/clients/store`;

    return this.http.get<ClientInterface[]>(url, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al obtener los clientes';
        return throwError(() => errorMessage);
      })
    );
  }

}
