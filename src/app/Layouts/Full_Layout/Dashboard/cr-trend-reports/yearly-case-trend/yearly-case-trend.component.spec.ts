import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyCaseTrendComponent } from './yearly-case-trend.component';

describe('YearlyCaseTrendComponent', () => {
  let component: YearlyCaseTrendComponent;
  let fixture: ComponentFixture<YearlyCaseTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyCaseTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyCaseTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
