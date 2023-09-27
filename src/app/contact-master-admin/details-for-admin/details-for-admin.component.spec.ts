import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsForAdminComponent } from './details-for-admin.component';

describe('DetailsForAdminComponent', () => {
  let component: DetailsForAdminComponent;
  let fixture: ComponentFixture<DetailsForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsForAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
