import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrTrendReportsComponent } from './cr-trend-reports.component';

describe('CrTrendReportsComponent', () => {
  let component: CrTrendReportsComponent;
  let fixture: ComponentFixture<CrTrendReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrTrendReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrTrendReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
