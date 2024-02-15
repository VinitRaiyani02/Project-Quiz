import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiowithinputComponent } from './radiowithinput.component';

describe('RadiowithinputComponent', () => {
  let component: RadiowithinputComponent;
  let fixture: ComponentFixture<RadiowithinputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadiowithinputComponent]
    });
    fixture = TestBed.createComponent(RadiowithinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
