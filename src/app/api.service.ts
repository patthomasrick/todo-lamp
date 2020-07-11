import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task, Priority } from './task';

const localUrl = "http://localhost:8080/api/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  })
};
const USER_LOG_IN = "user_login";
const USER_LOG_OUT = "user_logout";
const USER_VALIDATE_SESSION = "user_validate_session";
const TASKS_VIEW = "tasks";
const TASKS_CREATE = "tasks_create";

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
  private tasksSubject = new Subject<Array<Task>>();
  private selectedTaskSubject = new Subject<number>();

  constructor(private http: HttpClient) {
    this.loggedInSubject.next(false);
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

      this._getTasks();
    });
  }

  logout() {
    this.http.post<apiLoginReturn>(localUrl + USER_LOG_OUT, {}, httpOptions).pipe(
      catchError(e => { return this.handleError(e, true); })
    ).subscribe(data => {
      this.usernameSubject.next(null);
      this.sessionIDSubject.next(null);
      this.loggedInSubject.next(false);
    });
  }

  validateSession() {
    var $is_valid = false;
    this.http.post<any>(localUrl + USER_VALIDATE_SESSION, {}, httpOptions).pipe(
      catchError(e => { return this.handleError(e, true); })
    ).subscribe(data => {
      $is_valid = data.is_valid;
      this.usernameSubject.next(data.username);
      this.sessionIDSubject.next(data.session_id);
      this.loggedInSubject.next($is_valid);

      this._getTasks();
    });

    return $is_valid;
  }

  createTask(name: string, description: string, priority: string) {
    this.http.post<any>(localUrl + TASKS_CREATE, { name: name, description: description, priority: priority }, httpOptions).pipe(
      catchError(e => { return this.handleError(e, true); })
    ).subscribe(() => {
      this._getTasks();
    });
  }

  _getTasks() {
    this.http.post<Array<Task>>(localUrl + TASKS_VIEW, {}, httpOptions).pipe(
      catchError(e => { return this.handleError(e, true); })
    ).subscribe(data => {
      this.tasksSubject.next(data);
    });
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
