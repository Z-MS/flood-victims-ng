import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisplacedComponent } from './add-displaced.component';

describe('AddDisplacedComponent', () => {
  let component: AddDisplacedComponent;
  let fixture: ComponentFixture<AddDisplacedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDisplacedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDisplacedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
