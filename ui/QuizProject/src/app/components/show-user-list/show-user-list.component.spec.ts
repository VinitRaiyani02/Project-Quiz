import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserListComponent } from './show-user-list.component';

describe('ShowUserListComponent', () => {
  let component: ShowUserListComponent;
  let fixture: ComponentFixture<ShowUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowUserListComponent]
    });
    fixture = TestBed.createComponent(ShowUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
