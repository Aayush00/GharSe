import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefOrders } from './chef-orders';

describe('ChefOrders', () => {
  let component: ChefOrders;
  let fixture: ComponentFixture<ChefOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
