import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {NotificationService} from '../../services/notification.service';
import {CardModule} from 'primeng/card';
import {NotificationInterface} from '../../interfaces/notification-interface';
import {ButtonDirective} from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';



@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [
    NgForOf,
    CardModule,
    DatePipe,
    ButtonDirective,
    PaginatorModule
  ],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.css'
})
export class NotificationPageComponent implements OnInit {
  notifications: NotificationInterface[] = [];
  paginatedNotifications: NotificationInterface[] = [];
  rowsPerPage: number = 3;
  currentPage: number = 1;
  mensajeTitle: string = "FinApp te Notifica";

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotificationsByStore().subscribe(
      (data) => {
        this.notifications = data.sort((a, b) => {
          // @ts-ignore
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.paginate({ first: 0, rows: this.rowsPerPage });
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }


  paginate(event: any): void {
    const { first, rows } = event;
    this.currentPage = Math.floor(first / rows) + 1;
    this.paginatedNotifications = this.notifications.slice(first, first + rows);
  }
}

