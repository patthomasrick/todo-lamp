import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTasksViewComponent } from './all-tasks-view.component';

describe('AllTasksViewComponent', () => {
  let component: AllTasksViewComponent;
  let fixture: ComponentFixture<AllTasksViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTasksViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTasksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
