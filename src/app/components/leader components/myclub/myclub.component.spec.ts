import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyclubComponent } from './myclub.component';

describe('MyclubComponent', () => {
  let component: MyclubComponent;
  let fixture: ComponentFixture<MyclubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyclubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
