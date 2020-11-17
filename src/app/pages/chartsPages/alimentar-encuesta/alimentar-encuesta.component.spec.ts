import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentarEncuestaComponent } from './alimentar-encuesta.component';

describe('AlimentarEncuestaComponent', () => {
  let component: AlimentarEncuestaComponent;
  let fixture: ComponentFixture<AlimentarEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlimentarEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentarEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
