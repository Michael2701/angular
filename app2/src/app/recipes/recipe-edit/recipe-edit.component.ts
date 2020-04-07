import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private recipeService: RecipesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )


  }

  initForm(){
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, [Validators.required, Validators.minLength(3)]),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)]),
            })
          )
        }
      }
    }

    this.editForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required, Validators.minLength(3)]),
      'imagePath': new FormControl(imagePath, [Validators.required]),
      'description': new FormControl(description, [Validators.required, Validators.minLength(3)]),
      'ingredients': ingredients
    })
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.editForm.value);
      this.router.navigate(['/recipes', this.id]);
    }else{
      this.recipeService.addRecipe(this.editForm.value);
      this.router.navigate(['../']);

    }
  }

  addIngredient(){
    const control = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'amount': new FormControl(null, [Validators.required, Validators.min(1)])
    });
    (<FormArray>this.editForm.get('ingredients')).push(control);
  }

  deleteIngredient(i: number){
    (<FormArray>this.editForm.get('ingredients')).removeAt(i);
  }

  cancelEditing(){
    this.editForm.reset();
    this.router.navigate(['../']);
    this.editMode = false;
  }

  getControls(){
    return (<FormArray>this.editForm.get('ingredients')).controls;
  }

}
