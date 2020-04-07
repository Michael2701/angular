import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from '../shopping-list/shopping-list-edit/shopping-list-edit.component';


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports: [
        FormsModule, 
        ReactiveFormsModule, 
        RouterModule.forChild([
          {path: '', component: ShoppingListComponent}
        ]),
        SharedModule
    ]
})

export class ShoppingListModule{}