import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CzasopismaRoutingComponent } from './czasopisma-routing.component';

describe('CzasopismaRoutingComponent', () => {
  let component: CzasopismaRoutingComponent;
  let fixture: ComponentFixture<CzasopismaRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CzasopismaRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CzasopismaRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
