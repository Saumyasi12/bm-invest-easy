import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalTypeComponent } from './legal-type.component';

describe('LegalTypeComponent', () => {
  let component: LegalTypeComponent;
  let fixture: ComponentFixture<LegalTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
