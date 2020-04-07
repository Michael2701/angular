import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators'; 

import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService{
  private apiPath = 'https://recipe-book-bdf42.firebaseio.com/recipes.json';
  user: User;

  constructor(
    private http: HttpClient,
    private resipesService: RecipesService,
    private authService: AuthService
  ) { }



    storeRecipes(){
      const recipes = this.resipesService.getRecipes();
      this.http.put(this.apiPath, recipes).subscribe(
        response => {
          console.log(response);
        }
      );
    }

    fetchRecipes(){

      return this.http
        .get<Recipe[]>(this.apiPath)  
        .pipe(  
          map(
            recipes => {
              return recipes.map( recipe => { 
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []} 
              })
          }),
          tap( recipes => {
            this.resipesService.setRecipes(recipes);
          })
        )
    }

}
