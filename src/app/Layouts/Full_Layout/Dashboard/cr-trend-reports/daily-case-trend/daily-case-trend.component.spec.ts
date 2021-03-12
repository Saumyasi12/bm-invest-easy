import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCaseTrendComponent } from './daily-case-trend.component';

describe('DailyCaseTrendComponent', () => {
  let component: DailyCaseTrendComponent;
  let fixture: ComponentFixture<DailyCaseTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyCaseTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCaseTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
