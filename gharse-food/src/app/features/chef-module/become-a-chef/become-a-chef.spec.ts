import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAChef } from './become-a-chef';

describe('BecomeAChef', () => {
  let component: BecomeAChef;
  let fixture: ComponentFixture<BecomeAChef>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecomeAChef]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeAChef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
