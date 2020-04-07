import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IngredientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    CoreModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot({ 
      shoppingList: shoppingListReducer 
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
