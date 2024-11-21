import {inject, Injectable} from '@angular/core';
import {Client} from '@stomp/stompjs';
import {catchError, Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {NotificationInterface} from '../interfaces/notification-interface';
import {returnHeaders} from '../../shared/models/headers';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  getNotificationsByStore(): Observable<NotificationInterface[]> {
    const url = `${this.baseUrl}/notifications/user`;

    return this.http.get<NotificationInterface[]>(url, {headers: returnHeaders()}).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Error inesperado al obtener las notificaciones';
        return throwError(() => errorMessage);
      })
    );
  }
}

