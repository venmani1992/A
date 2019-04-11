import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SortComponent }      from './sort/sort.component';
import { OnlineComponent }      from './online/online.component';
const routes: Routes = [
  { path: '', redirectTo: '/online', pathMatch: 'full' },
  { path: 'sort', component: SortComponent },
  { path: 'online', component: OnlineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
