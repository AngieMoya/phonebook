import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Typecontact } from './typecontact';

describe('Typecontact', () => {
  let component: Typecontact;
  let fixture: ComponentFixture<Typecontact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Typecontact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Typecontact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
