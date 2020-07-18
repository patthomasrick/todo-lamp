import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../task';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from '../notifications.service';
import { NotificationClass } from '../notification/notification.component';

@Component({
  selector: 'app-task-details-view',
  templateUrl: './task-details-view.component.html',
  styleUrls: ['./task-details-view.component.scss']
})
export class TaskDetailsViewComponent implements OnInit {

  all_tasks: Map<number, Task>;
  task_index: number = -1;

  detailsForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl(''),
    date_due_date: new FormControl(''),
    date_due_time: new FormControl(''),
    date_created_date: new FormControl({ value: "", disabled: true }),
    date_created_time: new FormControl({ value: "", disabled: true }),
    id: new FormControl({ value: -1, hidden: true }),
  });

  constructor(private apiService: ApiService, private notifications: NotificationsService) {
    this.apiService.getTasks().subscribe(data => { this.all_tasks = data; });
    this.apiService.getSelectedTaskID().subscribe(data => {
      this.task_index = data;
      if (this.task_index < 0) {
        return;
      }

      var due_date, due_time;
      var date_due = this.all_tasks.get(this.task_index).date_due;
      if (date_due) {
        var split = date_due.toString().split(' ');
        due_time = split[1];
        due_date = split[0];
      } else {
        due_date = null;
        due_time = null;
      }

      var date_created = this.all_tasks.get(this.task_index).date_created;
      var split = date_created.toString().split(' ');
      var created_time = split[1];
      var created_date = split[0];

      this.detailsForm.setValue({
        name: this.all_tasks.get(this.task_index).name,
        description: this.all_tasks.get(this.task_index).description,
        priority: this.all_tasks.get(this.task_index).priority,
        date_due_date: due_date,
        date_due_time: due_time,
        date_created_date: created_date,
        date_created_time: created_time,
        id: this.task_index,
      });
    });
  }

  ngOnInit(): void {
  }

  currentTask() {
    return this.all_tasks.get(this.task_index);
  }

  saveDetails(value) {
    var date_due: string;
    if (value.date_due_date != null && value.date_due_time != null) {
      date_due = value.date_due_date + " " + value.date_due_time;
    }
    this.apiService.updateTask(+value.id, value.name, value.description, value.priority, date_due);
  }

  deleteActiveTask() {
    this.notifications.sendNotification({
      bulmaClass: NotificationClass.DANGER,
      message: "Deleted task \"" + this.all_tasks.get(this.task_index).name + "\"."
    });
    this.apiService.deleteTask(this.task_index);
  }
}
