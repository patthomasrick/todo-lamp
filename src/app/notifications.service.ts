import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from './notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private lastNotificationSubject = new Subject<Notification>();
  private hasBeenRead = new Subject<boolean>();

  constructor() { }

  sendNotification(notification: Notification) {
    this.lastNotificationSubject.next(notification);
    this.hasBeenRead.next(false);
  }

  getNotifications() {
    return this.lastNotificationSubject.asObservable();
  }

  isRead() {
    return this.hasBeenRead.asObservable();
  }

  readNotification() {
    this.hasBeenRead.next(true);
  }
}
