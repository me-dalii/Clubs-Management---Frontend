import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingEventComponent } from './landing-event.component';

describe('LandingEventComponent', () => {
  let component: LandingEventComponent;
  let fixture: ComponentFixture<LandingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
