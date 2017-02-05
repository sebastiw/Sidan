/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArrComponent } from './arr.component';

describe('ArrComponent', () => {
  let component: ArrComponent;
  let fixture: ComponentFixture<ArrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
