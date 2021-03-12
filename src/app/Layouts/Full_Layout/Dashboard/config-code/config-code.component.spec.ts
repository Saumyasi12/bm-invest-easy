import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCodeComponent } from './config-code.component';

describe('ConfigCodeComponent', () => {
  let component: ConfigCodeComponent;
  let fixture: ComponentFixture<ConfigCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
