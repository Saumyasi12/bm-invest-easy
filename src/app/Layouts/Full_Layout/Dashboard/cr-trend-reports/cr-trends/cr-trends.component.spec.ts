import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrTrendsComponent } from './cr-trends.component';

describe('CrTrendsComponent', () => {
  let component: CrTrendsComponent;
  let fixture: ComponentFixture<CrTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrTrendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
