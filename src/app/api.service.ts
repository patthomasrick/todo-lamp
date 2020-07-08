import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const localUrl = "http://localhost:8080/api/";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  logged_in: boolean = false;
  username: string = "";
  session_id: string = "";

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    var $post_data = { username: username, password: password };
    console.log($post_data);
    var $post = this.http.post<any>(localUrl + "userlogin", $post_data, httpOptions);
    return $post;
  }
}
