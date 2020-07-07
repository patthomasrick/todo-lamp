import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AllTasksViewComponent } from './all-tasks-view/all-tasks-view.component';
import { TaskDetailsViewComponent } from './task-details-view/task-details-view.component';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    AllTasksViewComponent,
    TaskDetailsViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private apiService: ApiService) {
    var post = this.apiService.login('patrick', 'mypassword');
    post.subscribe(resp => {
      console.log(resp);
    });
  }
}
