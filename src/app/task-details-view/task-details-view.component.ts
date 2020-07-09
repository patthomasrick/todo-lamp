import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-task-details-view',
  templateUrl: './task-details-view.component.html',
  styleUrls: ['./task-details-view.component.scss']
})
export class TaskDetailsViewComponent implements OnInit {

  selectedTask: number = -1;

  constructor(private apiService: ApiService) {
    this.apiService.getSelectedTaskID().subscribe(data => { this.selectedTask = data; });
  }

  ngOnInit(): void {
  }

}
