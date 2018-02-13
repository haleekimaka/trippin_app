import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedreviewsComponent } from './likedreviews.component';

describe('LikedreviewsComponent', () => {
  let component: LikedreviewsComponent;
  let fixture: ComponentFixture<LikedreviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedreviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
