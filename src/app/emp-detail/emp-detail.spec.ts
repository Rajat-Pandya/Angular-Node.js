import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDetail } from './emp-detail';

describe('EmpDetail', () => {
  let component: EmpDetail;
  let fixture: ComponentFixture<EmpDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
