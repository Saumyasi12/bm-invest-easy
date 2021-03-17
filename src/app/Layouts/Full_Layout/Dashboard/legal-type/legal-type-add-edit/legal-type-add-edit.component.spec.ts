import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalTypeAddEditComponent } from './legal-type-add-edit.component';

describe('LegalTypeAddEditComponent', () => {
  let component: LegalTypeAddEditComponent;
  let fixture: ComponentFixture<LegalTypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalTypeAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
