import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNamePageComponent } from './get-name-page.component';

describe('GetNamePageComponent', () => {
  let component: GetNamePageComponent;
  let fixture: ComponentFixture<GetNamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetNamePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetNamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
