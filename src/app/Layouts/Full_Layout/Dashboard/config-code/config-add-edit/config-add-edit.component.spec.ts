import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAddEditComponent } from './config-add-edit.component';

describe('ConfigAddEditComponent', () => {
  let component: ConfigAddEditComponent;
  let fixture: ComponentFixture<ConfigAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
