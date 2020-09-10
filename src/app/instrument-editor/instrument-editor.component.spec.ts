import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentEditorComponent } from './instrument-editor.component';

describe('InstrumentEditorComponent', () => {
  let component: InstrumentEditorComponent;
  let fixture: ComponentFixture<InstrumentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
