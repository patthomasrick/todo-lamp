import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AllTasksViewComponent } from './all-tasks-view/all-tasks-view.component';
import { TaskDetailsViewComponent } from './task-details-view/task-details-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTasksViewComponent,
    TaskDetailsViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
