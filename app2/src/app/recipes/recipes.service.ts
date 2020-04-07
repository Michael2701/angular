import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class RecipesService {

  private recipes: Recipe[] = [];

  recipesChanged = new Subject<Recipe[]>();

  constructor() { }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes.slice()[id-1];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: Recipe){
    this.recipes[id-1] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number){
    this.recipes.splice((id-1), 1);
    this.recipesChanged.next(this.recipes.slice());
  }


}
