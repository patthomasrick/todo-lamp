import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from './api.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo-patrickwthomas-net';

  loggedIn: boolean = false;
  username: string;
  sessionID: string;

  loginForm;

  constructor(public apiService: ApiService, private formBuilder: FormBuilder) {
    this.apiService.isLoggedIn().subscribe(data => { this.loggedIn = data; });
    this.apiService.getUsername().subscribe(data => { this.username = data; });
    this.apiService.getSessionID().subscribe(data => { this.sessionID = data; });

    this.loginForm = this.formBuilder.group({ username: "", password: "" });
  }

  ngOnInit() {
    this.apiService.validateSession();
  }

  logInSubmit(values) {
    this.apiService.login(values.username, values.password);
  }

  logOutSubmit() {
    this.apiService.logout();
  }
}
