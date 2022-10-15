import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingClubComponent } from './landing-club.component';

describe('LandingClubComponent', () => {
  let component: LandingClubComponent;
  let fixture: ComponentFixture<LandingClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
