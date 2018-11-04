import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequirementsComponent } from './update-requirements.component';

describe('UpdateRequirementsComponent', () => {
  let component: UpdateRequirementsComponent;
  let fixture: ComponentFixture<UpdateRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
