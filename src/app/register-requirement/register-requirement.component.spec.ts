import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRequirementComponent } from './register-requirement.component';

describe('RegisterRequirementComponent', () => {
  let component: RegisterRequirementComponent;
  let fixture: ComponentFixture<RegisterRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
