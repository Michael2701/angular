import { NgModule } from '@angular/core';

import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeItemComponent } from '../recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from '../recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { ChooseRecipeComponent } from '../recipes/choose-recipe/choose-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module'

import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RecipeItemComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipesComponent,
    ChooseRecipeComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ]
})

export class RecipesModule { }
