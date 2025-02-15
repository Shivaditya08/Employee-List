import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpdashComponent } from './empdash.component';

describe('EmpdashComponent', () => {
  let component: EmpdashComponent;
  let fixture: ComponentFixture<EmpdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpdashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
