import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionStepsComponent } from './configuracion-steps.component';

describe('ConfiguracionStepsComponent', () => {
  let component: ConfiguracionStepsComponent;
  let fixture: ComponentFixture<ConfiguracionStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
