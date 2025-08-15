import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modaldelete } from './modaldelete';

describe('Modaldelete', () => {
  let component: Modaldelete;
  let fixture: ComponentFixture<Modaldelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modaldelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modaldelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
