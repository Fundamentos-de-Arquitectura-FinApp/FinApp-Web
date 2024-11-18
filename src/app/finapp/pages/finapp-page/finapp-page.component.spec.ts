import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinappPageComponent } from './finapp-page.component';

describe('FinappPageComponent', () => {
  let component: FinappPageComponent;
  let fixture: ComponentFixture<FinappPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinappPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinappPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
