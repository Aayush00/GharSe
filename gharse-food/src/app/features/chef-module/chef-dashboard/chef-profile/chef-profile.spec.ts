import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefProfile } from './chef-profile';

describe('ChefProfile', () => {
  let component: ChefProfile;
  let fixture: ComponentFixture<ChefProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
