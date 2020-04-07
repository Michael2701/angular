import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})

export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 4),
    new Ingredient('Tomatoes', 10)
  ];

  constructor(private store: Store<{ shoppingList: { ingredients: Ingredient[]}}>) { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    // this.ingridientAdded.emit(this.ingredients.slice());
    this.ingridientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    // this.ingridientAdded.emit(this.ingredients.slice());
    this.ingridientAdded.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.ingridientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingridientAdded.next(this.ingredients.slice());
  }

  // ingridientAdded = new EventEmitter<Ingredient[]>();
  ingridientAdded = new Subject<Ingredient[]>();

  startingEditing = new Subject<number>();


}
