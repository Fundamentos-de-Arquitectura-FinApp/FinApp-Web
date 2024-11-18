import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, catchError, map, Observable, throwError} from 'rxjs';
import {ClientInterface} from '../interfaces/client-interface';
import {returnHeaders} from '../../shared/models/headers';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  dni: string = '';
  private clientIdSubject = new BehaviorSubject<number | null>(null);
  clientId$ = this.clientIdSubject.asObservable();

  private accountIdSubject = new BehaviorSubject<number | null>(null);
  accountId$ = this.accountIdSubject.asObservable();

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

  getClientByDni(dni:string) : Observable<ClientInterface> {
    const url = `${this.baseUrl}/clients/search/${dni}`;
    return this.http.get<ClientInterface>(url, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al obtener el cliente por DNI';
        return throwError(() => errorMessage);
      })
    )
  }

  isAllowedCreditClient(dni:string) : Observable<boolean> {
    const url = `${this.baseUrl}/clients/isAllowedCredit/${dni}`;
    return this.http.get<{isAllowedCredit: boolean}>(url, {headers: returnHeaders()}).pipe(
      map(response => response.isAllowedCredit),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al verificar si es Apto el cliente para el credito';
        return throwError(() => errorMessage);
      })
    )
  }

  setClientId(clientId: number | null): void {
    this.clientIdSubject.next(clientId);
  }

  getClientId(): number | null {
    return this.clientIdSubject.value;
  }
  setAccountId(accountId: number | null): void {
    this.accountIdSubject.next(accountId);
  }

  getAccountId(): number | null {
    return this.accountIdSubject.value;
  }
}
