import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscr: Subscription;

  constructor(private recipesService: RecipesService) {
    this.subscr = this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      } 
    )
  }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
  }

  ngOnDestroy(){
    this.subscr.unsubscribe();
  }
}
