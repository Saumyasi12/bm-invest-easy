import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrNumberComponent } from './cr-number.component';

describe('CrNumberComponent', () => {
  let component: CrNumberComponent;
  let fixture: ComponentFixture<CrNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
