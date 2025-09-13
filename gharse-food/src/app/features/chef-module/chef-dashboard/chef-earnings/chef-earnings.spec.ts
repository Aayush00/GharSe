import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefEarnings } from './chef-earnings';

describe('ChefEarnings', () => {
  let component: ChefEarnings;
  let fixture: ComponentFixture<ChefEarnings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefEarnings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefEarnings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
