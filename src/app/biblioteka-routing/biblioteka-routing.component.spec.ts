import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotekaRoutingComponent } from './biblioteka-routing.component';

describe('BibliotekaRoutingComponent', () => {
  let component: BibliotekaRoutingComponent;
  let fixture: ComponentFixture<BibliotekaRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibliotekaRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotekaRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
