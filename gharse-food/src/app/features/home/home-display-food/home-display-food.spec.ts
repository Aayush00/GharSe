import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDisplayFood } from './home-display-food';

describe('HomeDisplayFood', () => {
  let component: HomeDisplayFood;
  let fixture: ComponentFixture<HomeDisplayFood>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDisplayFood]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDisplayFood);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
