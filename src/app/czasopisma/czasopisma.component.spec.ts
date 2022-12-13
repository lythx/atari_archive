import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CzasopismaComponent } from './czasopisma.component';

describe('CzasopismaComponent', () => {
  let component: CzasopismaComponent;
  let fixture: ComponentFixture<CzasopismaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CzasopismaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CzasopismaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
