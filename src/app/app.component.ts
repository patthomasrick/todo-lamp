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

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    var $post = this.apiService.login("patrick", "mypassword");
    console.log($post);
    $post.subscribe(data => {
      console.log(data);
    });
  }
}
