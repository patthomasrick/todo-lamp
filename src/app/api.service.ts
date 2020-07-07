import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const localUrl = "http://localhost:8080/api/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(localUrl + "userlogin", { 'username': username, 'password': password });
  }
}
