import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMasterAdminComponent } from './contact-master-admin.component';

describe('ContactMasterAdminComponent', () => {
  let component: ContactMasterAdminComponent;
  let fixture: ComponentFixture<ContactMasterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactMasterAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactMasterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
