import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplacedPersonsComponent } from './displaced-persons.component';

describe('DisplacedPersonsComponent', () => {
  let component: DisplacedPersonsComponent;
  let fixture: ComponentFixture<DisplacedPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplacedPersonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplacedPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
