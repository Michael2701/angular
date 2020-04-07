import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRecipeComponent } from './choose-recipe.component';

describe('ChooseRecipeComponent', () => {
  let component: ChooseRecipeComponent;
  let fixture: ComponentFixture<ChooseRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
