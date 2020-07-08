import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-patrickwthomas-net';

  loggedIn:boolean = false;
  username:string;
  sessionID:string;

  formUsername:string;
  formPassword:string;

  constructor(public apiService: ApiService, private formBuilder: FormBuilder) {
    this.apiService.isLoggedIn().subscribe(data => {
      this.loggedIn = data;
    })
    this.apiService.getUsername().subscribe(data => {
      this.username = data;
    })
    this.apiService.getSessionID().subscribe(data => {
      this.sessionID = data;
    })
  }

  formSubmit() {
    this.apiService.login(this.formUsername, this.formPassword);
  }
}
