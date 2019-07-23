import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { NewComponent } from './new/new.component'
import { EditComponent } from './edit/edit.component'
import { ViewComponent } from './view/view.component'


const routes: Routes = [
  {path: 'products/new', component: NewComponent},
  {path: 'products/:id', component: ViewComponent},
  {path: 'products/:id/edit', component: EditComponent},
  {path: 'products', component: ProductsComponent},
  { path: '', pathMatch: 'full', redirectTo: '/products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
