import { ComponentFixture, TestBed } from '@angular/core/testing';

import { updateUserComponent } from './update-user.component';

describe('updateUserComponent', () => {
  let component: updateUserComponent;
  let fixture: ComponentFixture<updateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ updateUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(updateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
