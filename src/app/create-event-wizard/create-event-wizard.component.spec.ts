import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventWizardComponent } from './create-event-wizard.component';

describe('CreateEventWizardComponent', () => {
  let component: CreateEventWizardComponent;
  let fixture: ComponentFixture<CreateEventWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
