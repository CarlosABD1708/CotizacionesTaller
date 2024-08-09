import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajosPendientesComponent } from './trabajos-pendientes.component';

describe('TrabajosPendientesComponent', () => {
  let component: TrabajosPendientesComponent;
  let fixture: ComponentFixture<TrabajosPendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrabajosPendientesComponent]
    });
    fixture = TestBed.createComponent(TrabajosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
