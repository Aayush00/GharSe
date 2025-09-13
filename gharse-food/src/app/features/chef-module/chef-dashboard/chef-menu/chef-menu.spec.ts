import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefMenu } from './chef-menu';

describe('ChefMenu', () => {
  let component: ChefMenu;
  let fixture: ComponentFixture<ChefMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
