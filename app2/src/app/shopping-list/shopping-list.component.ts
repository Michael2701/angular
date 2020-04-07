import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>
  ingredient: Ingredient;
  private subscr: Subscription;

  constructor(
    private shoppingService: ShoppingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>  
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

  }

  onEditItem(id: number){
    this.shoppingService.startingEditing.next(id);
  }

  ngOnDestroy(): void{
    //this.subscr.unsubscribe();
  }

}

