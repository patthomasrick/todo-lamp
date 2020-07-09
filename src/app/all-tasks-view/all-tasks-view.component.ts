import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../task';

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

  constructor(public apiService: ApiService) {
    this.apiService.isLoggedIn().subscribe(data => { this.loggedIn = data; });
    this.apiService.getUsername().subscribe(data => { this.username = data; });
    this.apiService.getSessionID().subscribe(data => { this.sessionID = data; });
    this.apiService.getTasks().subscribe(data => { this.all_tasks = data; });
  }

  ngOnInit() {
  }

  selectTask(taskID: number) {
    this.apiService.setSelectedTaskID(taskID);
  }
}
