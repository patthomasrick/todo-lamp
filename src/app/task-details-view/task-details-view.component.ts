import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-details-view',
  templateUrl: './task-details-view.component.html',
  styleUrls: ['./task-details-view.component.scss']
})
export class TaskDetailsViewComponent implements OnInit {

  all_tasks: Array<Task>;
  task_index: number = -1;

  constructor(private apiService: ApiService) {
    this.apiService.getTasks().subscribe(data => { this.all_tasks = data; });
    this.apiService.getSelectedTaskID().subscribe(data => {
      this.task_index = data;
    });
  }

  ngOnInit(): void {
  }

  currentTask() {
    return this.all_tasks.find((v) => { return v.id === this.task_index; });
  }
}
