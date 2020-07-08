import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

const localUrl = "http://localhost:8080/api/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private loggedInSubject = new Subject<boolean>();
  private usernameSubject = new Subject<string>();
  private sessionIDSubject = new Subject<string>();

  constructor(private http: HttpClient) {
    this.loggedInSubject.next(false);
  }

  login(username: string, password: string) {
    var $post_data = { username: username, password: password };
    console.log(JSON.stringify($post_data));
    this.http.post<any>(localUrl + "userlogin", JSON.stringify($post_data)).subscribe(data => {
      this.usernameSubject.next(data.username);
      this.sessionIDSubject.next(data.session_id);
      this.loggedInSubject.next(true);
      console.log("logged in user " + data.username);
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
}
