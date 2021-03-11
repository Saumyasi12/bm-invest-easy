import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredCrdataComponent } from './expired-crdata.component';

describe('ExpiredCrdataComponent', () => {
  let component: ExpiredCrdataComponent;
  let fixture: ComponentFixture<ExpiredCrdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredCrdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredCrdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
