import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Task, Priority } from '../task';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-all-tasks-view',
  templateUrl: './all-tasks-view.component.html',
  styleUrls: ['./all-tasks-view.component.scss']
})
export class AllTasksViewComponent implements OnInit {

  loggedIn: boolean = false;
  username: string;
  sessionID: string;

  all_tasks: Array<Task>;

  createTaskForm;

  constructor(public apiService: ApiService, private formBuilder: FormBuilder) {
    this.apiService.isLoggedIn().subscribe(data => { this.loggedIn = data; });
    this.apiService.getUsername().subscribe(data => { this.username = data; });
    this.apiService.getSessionID().subscribe(data => { this.sessionID = data; });
    this.apiService.getTasks().subscribe(data => { this.all_tasks = data; });

    this.createTaskForm = this.formBuilder.group({ name: "", description: "", priority: "" });
    this.createTaskForm.setValue({ name: "", description: "", priority: "normal" })
  }

  ngOnInit() {
  }

  selectTask(taskID: number) {
    this.apiService.setSelectedTaskID(taskID);
  }

  createTask(values) {
    this.apiService.createTask(values.name, values.description, values.priority);
  }
}
