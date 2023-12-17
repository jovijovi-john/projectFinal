import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieSectionComponent } from './categorie-section.component';

describe('CategorieSectionComponent', () => {
  let component: CategorieSectionComponent;
  let fixture: ComponentFixture<CategorieSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorieSectionComponent],
    });
    fixture = TestBed.createComponent(CategorieSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
