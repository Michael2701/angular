import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard.service';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'parent' },
  {path: 'parent', component: ParentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
