import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard.service';
import { ChooseRecipeComponent } from './choose-recipe/choose-recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolverService } from './recipes-resolver.service';

const routes: Routes = [
    {
        path: '', 
        component: RecipesComponent,
        canActivate: [AuthGuard], 
        children: [
          {path: '', pathMatch: 'full', component: ChooseRecipeComponent},
          {path: 'new', component: RecipeEditComponent},
          {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
          {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule{}