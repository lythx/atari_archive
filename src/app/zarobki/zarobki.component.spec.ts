import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZarobkiComponent } from './zarobki.component';

describe('ZarobkiComponent', () => {
  let component: ZarobkiComponent;
  let fixture: ComponentFixture<ZarobkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZarobkiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZarobkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
