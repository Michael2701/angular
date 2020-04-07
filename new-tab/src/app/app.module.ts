import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoundedBtnComponent } from './shared/rounded-btn/rounded-btn.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { BackdropComponent } from './shared/backdrop/backdrop.component';
import { BackgroundsComponent } from './side-menu/backgrounds/backgrounds.component';
import { BackgroundComponent } from './side-menu/backgrounds/background/background.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResulsComponent } from './search-bar/search-resuls/search-resuls.component';

@NgModule({
  declarations: [
    AppComponent,
    RoundedBtnComponent,
    SideMenuComponent,
    BackdropComponent,
    BackgroundsComponent,
    BackgroundComponent,
    SearchBarComponent,
    SearchResulsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
