import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionProcesoComponent } from './configuracion-proceso.component';

describe('ConfiguracionProcesoComponent', () => {
  let component: ConfiguracionProcesoComponent;
  let fixture: ComponentFixture<ConfiguracionProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
