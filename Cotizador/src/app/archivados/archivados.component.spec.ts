import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivadosComponent } from './archivados.component';

describe('ArchivadosComponent', () => {
  let component: ArchivadosComponent;
  let fixture: ComponentFixture<ArchivadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivadosComponent]
    });
    fixture = TestBed.createComponent(ArchivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
