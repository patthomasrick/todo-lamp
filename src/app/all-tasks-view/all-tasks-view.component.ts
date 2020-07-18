import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../task';
import { FormBuilder } from '@angular/forms';

enum SORT_BY {
  date_created, date_due, name
}

@Component({
  selector: 'app-all-tasks-view',
  templateUrl: './all-tasks-view.component.html',
  styleUrls: ['./all-tasks-view.component.scss']
})
export class AllTasksViewComponent implements OnInit {

  loggedIn: boolean = false;
  username: string;
  sessionID: string;
  selected_task: number;

  all_tasks: Map<number, Task> = new Map();
  current_tasks: Array<number> = new Array();
  finished_tasks: Array<number> = new Array();
  finished_tasks_collapsed: boolean = true;

  createTaskForm;

  constructor(public apiService: ApiService, private formBuilder: FormBuilder) {
    this.apiService.isLoggedIn().subscribe(data => { this.loggedIn = data; });
    this.apiService.getUsername().subscribe(data => { this.username = data; });
    this.apiService.getSessionID().subscribe(data => { this.sessionID = data; });
    this.apiService.getSelectedTaskID().subscribe(data => { this.selected_task = data; });
    this.apiService.getTasks().subscribe(
      data => {
        setTimeout(() => {
          this.all_tasks = data;
          this.current_tasks = new Array();
          this.finished_tasks = new Array();
          this.all_tasks.forEach((value, key, map) => {
            if (value.done == 0) {
              this.current_tasks.push(key);
            } else {
              this.finished_tasks.push(key);
            }
          });
          this.sortTasks(SORT_BY.date_created);
        });
      });

    this.createTaskForm = this.formBuilder.group({ name: "", description: "", priority: "" });
  }

  ngOnInit() {
    this.createTaskForm.setValue({ name: "", description: "", priority: "normal" });
  }

  selectTask(taskID: number) {
    this.apiService.setSelectedTaskID(taskID);
  }

  createTask(values) {
    this.apiService.createTask(values.name, values.description, values.priority);
    this.createTaskForm.setValue({ name: "", description: "", priority: "normal" });
  }

  getNotDoneTasks() {
    var $tasks = new Array<Task>();
    this.all_tasks.forEach((value, key, map) => {
      if (value.done == 0) {
        $tasks.push(value);
      }
    });
    return $tasks;
  }

  sortTasks(s: SORT_BY) {
    var $created = (a: number, b: number) => {
      var $taskA = this.all_tasks.get(a);
      var $taskB = this.all_tasks.get(b);
      return $taskA.date_created.valueOf() - $taskB.date_created.valueOf();
    };
    var $due = (a: number, b: number) => {
      var $taskA = this.all_tasks.get(a);
      var $taskB = this.all_tasks.get(b);
      return $taskA.date_due.valueOf() - $taskB.date_due.valueOf();
    };
    var $name = (a: number, b: number) => {
      var $taskA = this.all_tasks.get(a);
      var $taskB = this.all_tasks.get(b);
      return $taskA.name.localeCompare($taskB.name);
    };

    if (s == SORT_BY.date_created) {
      this.current_tasks = this.current_tasks.sort($created);
    } else if (s == SORT_BY.date_due) {
      this.current_tasks = this.current_tasks.sort($due);
    } else if (s == SORT_BY.name) {
      this.current_tasks = this.current_tasks.sort($name);
    }
  }

  onDoneChange(task_id: number, to_value: number) {
    this.apiService.setTaskIsDone(task_id, to_value);
  }
}
