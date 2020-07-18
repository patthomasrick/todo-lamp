import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { timer } from 'rxjs';

export enum NotificationClass {
  PRIMARY = 'is-primary',
  LINK = 'is-link',
  INFO = 'is-info',
  SUCCESS = 'is-success',
  WARNING = 'is-warning',
  DANGER = 'is-danger',
  DISABLED = '',
}

export interface Notification {
  bulmaClass: NotificationClass;
  message: string;
}

@Component({
  selector: 'app-notification',
  animations: [
    trigger('toggleHidden', [
      state('hidden', style({
        opacity: 0,
      })),
      state('shown', style({
        opacity: 1,
      })),
      transition('hidden => shown', [
        animate('0.5s ease-in')
      ]),
      transition('shown => hidden', [
        animate('2.0s ease-out')
      ]),
    ]),
  ],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notification: Notification;
  notificationRead: boolean = true;

  constructor(private notifications: NotificationsService) {
    this.notifications.getNotifications().subscribe(data => {
      this.notification = data;
      const source = timer(5000);
      source.subscribe(val => {
        if (this.notification == data) {
          this.markAsRead();
        }
      });
    });
    this.notifications.isRead().subscribe(data => { this.notificationRead = data; });
  }

  ngOnInit(): void { }

  toggle() {
    this.notificationRead = !this.notificationRead;
  }

  markAsRead() {
    this.notifications.readNotification();
  }
}
