import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenrePageComponent } from './admin-genre-page.component';

describe('AdminGenrePageComponent', () => {
  let component: AdminGenrePageComponent;
  let fixture: ComponentFixture<AdminGenrePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGenrePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGenrePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
