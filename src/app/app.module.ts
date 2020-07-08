import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    BrowserModule,
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
