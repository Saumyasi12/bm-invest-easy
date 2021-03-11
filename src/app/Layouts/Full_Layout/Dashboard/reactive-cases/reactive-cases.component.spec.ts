import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveCasesComponent } from './reactive-cases.component';

describe('ReactiveCasesComponent', () => {
  let component: ReactiveCasesComponent;
  let fixture: ComponentFixture<ReactiveCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
