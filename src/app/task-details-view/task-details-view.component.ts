import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../task';
import { FormControl, FormGroup } from '@angular/forms';

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
    date_created_date: new FormControl({value: "", disabled: true}),
    date_created_time: new FormControl({value: "", disabled: true}),
  });

  constructor(private apiService: ApiService) {
    this.apiService.getTasks().subscribe(data => { this.all_tasks = data; });
    this.apiService.getSelectedTaskID().subscribe(data => {
      this.task_index = data;

      var $due_date, $due_time;

      var $date_due = this.all_tasks.get(this.task_index).date_due;
      if ($date_due) {
        $due_time = String($date_due.getHours()).padStart(2, "0") + ":" + String($date_due.getMinutes()).padStart(2, "0");
        $due_date = String($date_due.getFullYear()).padStart(4, "0") + "-" + String($date_due.getMonth()).padStart(2, "0") + "-" + String($date_due.getDay()).padStart(2, "0");
      } else {
        $due_date = null;
        $due_time = null;
      }

      var $date_created = this.all_tasks.get(this.task_index).date_created;
      var $split = $date_created.toString().split(' ');
      var $created_time = $split[1];
      var $created_date = $split[0];

      this.detailsForm.setValue({
        name: this.all_tasks.get(this.task_index).name,
        description: this.all_tasks.get(this.task_index).description,
        priority: this.all_tasks.get(this.task_index).priority,
        date_due_date: $due_date,
        date_due_time: $due_time,
        date_created_date: $created_date,
        date_created_time: $created_time,
      });
    });
  }

  ngOnInit(): void {
  }

  currentTask() {
    return this.all_tasks.get(this.task_index);
  }

  saveDetails() {

  }

  deleteActiveTask() {

  }
}
