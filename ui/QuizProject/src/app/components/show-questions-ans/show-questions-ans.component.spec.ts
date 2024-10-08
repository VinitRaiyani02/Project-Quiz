import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuestionsAnsComponent } from './show-questions-ans.component';

describe('ShowQuestionsAnsComponent', () => {
  let component: ShowQuestionsAnsComponent;
  let fixture: ComponentFixture<ShowQuestionsAnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowQuestionsAnsComponent]
    });
    fixture = TestBed.createComponent(ShowQuestionsAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
