/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WriteEntryComponent } from './write-entry.component';

describe('WriteEntryComponent', () => {
  let component: WriteEntryComponent;
  let fixture: ComponentFixture<WriteEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
