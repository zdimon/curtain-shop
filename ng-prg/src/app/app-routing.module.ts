import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodComponent } from './good/good.component';
import { SearchComponent } from './search/search.component';
import { BasketComponent } from './basket/basket.component';
import { DetailComponent } from './detail/detail.component';
const routes: Routes = [

  { path: 'good', component: GoodComponent },
  { path: 'search', component: SearchComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '', redirectTo: 'good' ,pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
