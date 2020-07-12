import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from './task';

const localUrl = "http://localhost:8080/api/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  })
};
const USER_LOG_IN = "user/login";
const USER_LOG_OUT = "user/logout";
const USER_VALIDATE_SESSION = "user/validate";
const TASKS_VIEW = "tasks/view";
const TASKS_CREATE = "tasks/create";
const TASKS_SET_DONE = "tasks/set_done";

interface apiLoginReturn {
  username: string;
  session_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private loggedInSubject = new Subject<boolean>();
  private usernameSubject = new Subject<string>();
  private sessionIDSubject = new Subject<string>();
  private tasksSubject = new Subject<Map<number, Task>>();
  private selectedTaskSubject = new Subject<number>();

  constructor(private http: HttpClient) {
    this.reset();
  }

  private reset() {
    this.loggedInSubject.next(false);
    this.usernameSubject.next("");
    this.sessionIDSubject.next("");
    this.tasksSubject.next(new Map<number, Task>());
    this.selectedTaskSubject.next(-1);
  }

  login(username: string, password: string) {
    var $post_data = { username: username, password: password };
    this.http.post<apiLoginReturn>(localUrl + USER_LOG_IN, $post_data, httpOptions).pipe(
      catchError(e => { return this.handleError(e, false); })
    ).subscribe(data => {
      this.usernameSubject.next(data.username);
      this.sessionIDSubject.next(data.session_id);
      this.loggedInSubject.next(true);

      this.updateTasks();
    });
  }

  logout() {
    this.http.post<apiLoginReturn>(localUrl + USER_LOG_OUT, {}, httpOptions).pipe(
      catchError(e => { return this.handleError(e, true); })
    ).subscribe(data => {
      this.reset();
    });
  }

  validateSession() {
    this.http.post<any>(localUrl + USER_VALIDATE_SESSION, {}, httpOptions).pipe(
      catchError(e => { return this.handleError(e, true); })
    ).subscribe(data => {
      this.usernameSubject.next(data.username);
      this.sessionIDSubject.next(data.session_id);
      this.loggedInSubject.next(data.is_valid);
      this.updateTasks();
    });
  }

  createTask(name: string, description: string, priority: string) {
    if (name.length < 1) {
      return;
    }
    this.http.post<any>(localUrl + TASKS_CREATE, { name: name, description: description, priority: priority }, httpOptions).pipe(
      catchError(e => { return this.handleError(e, true); })
    ).subscribe((data) => {
      var $tasks = new Map<number, Task>();
      data.tasks.forEach(element => {
        $tasks.set(element.id, element);
      });
      this.tasksSubject.next($tasks);
      this.selectedTaskSubject.next(data.id);
    });
  }

  updateTasks() {
    this.http.post<Array<Task>>(localUrl + TASKS_VIEW, {}, httpOptions).pipe(
      catchError(e => { return this.handleError(e, true); })
    ).subscribe(data => {
      var $tasks = new Map<number, Task>();
      data.forEach(element => {
        $tasks.set(element.id, element);
      });
      this.tasksSubject.next($tasks);
    });
  }

  setTaskIsDone(taskID: number, isDone: number) {
    if (isDone > 1 && isDone < 0) { return; }
    this.http.post<any>(localUrl + TASKS_SET_DONE, { "task_id": taskID, "task_done": isDone }, httpOptions).pipe(
      catchError(e => { return this.handleError(e, true); })
    ).subscribe(data => { this.updateTasks(); });
  }

  getUsername() {
    return this.usernameSubject.asObservable();
  }

  getSessionID() {
    return this.sessionIDSubject.asObservable();
  }

  isLoggedIn() {
    return this.loggedInSubject.asObservable();
  }

  getTasks() {
    return this.tasksSubject.asObservable();
  }

  getSelectedTaskID() {
    return this.selectedTaskSubject.asObservable();
  }

  setSelectedTaskID(id: number) {
    return this.selectedTaskSubject.next(id);
  }

  private handleError(error: HttpErrorResponse, silent: boolean = false) {
    if (!silent) {
      alert("Log in failed!");
    }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}: ${error.statusText}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
