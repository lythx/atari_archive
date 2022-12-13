import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorieRoutingComponent } from './kategorie-routing.component';

describe('KategorieRoutingComponent', () => {
  let component: KategorieRoutingComponent;
  let fixture: ComponentFixture<KategorieRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KategorieRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategorieRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
