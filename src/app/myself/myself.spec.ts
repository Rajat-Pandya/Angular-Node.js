import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myself } from './myself';

describe('Myself', () => {
  let component: Myself;
  let fixture: ComponentFixture<Myself>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myself],
    }).compileComponents();

    fixture = TestBed.createComponent(Myself);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
