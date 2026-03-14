import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemsPerChefAndName } from './food-items-per-chef-and-name';

describe('FoodItemsPerChefAndName', () => {
  let component: FoodItemsPerChefAndName;
  let fixture: ComponentFixture<FoodItemsPerChefAndName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodItemsPerChefAndName]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodItemsPerChefAndName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
