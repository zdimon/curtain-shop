import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodComponent } from './good/good.component';
import { SearchComponent } from './search/search.component';
import { BasketComponent } from './basket/basket.component';
import { DetailComponent } from './detail/detail.component';
import { AboutgoodComponent } from './detail/aboutgood.component';
import { AboutvendorComponent } from './detail/aboutvendor.component';
import { CommentComponent } from './detail/comment.component';

const goodRoutes = [
  { path: 'about', component: AboutgoodComponent },
  { path: 'vendor', component: AboutvendorComponent },
  { path: 'comment', component: CommentComponent },
  { path: '', redirectTo: 'about' ,pathMatch: 'full'},
]

const routes: Routes = [

  { path: 'good', component: GoodComponent },
  { path: 'search', component: SearchComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'detail/:id', component: DetailComponent, children: goodRoutes },
  { path: '', redirectTo: 'good' ,pathMatch: 'full'},
  //{ path: 'good/about', component: AboutgoodComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
