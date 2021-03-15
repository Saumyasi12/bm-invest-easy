import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCodeAddEditComponent } from './country-code-add-edit.component';

describe('CountryCodeAddEditComponent', () => {
  let component: CountryCodeAddEditComponent;
  let fixture: ComponentFixture<CountryCodeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCodeAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCodeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
