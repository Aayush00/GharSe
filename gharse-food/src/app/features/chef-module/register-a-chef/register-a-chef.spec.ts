import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAChef } from './register-a-chef';

describe('RegisterAChef', () => {
  let component: RegisterAChef;
  let fixture: ComponentFixture<RegisterAChef>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAChef]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAChef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
