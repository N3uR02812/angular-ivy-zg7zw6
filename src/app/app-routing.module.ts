import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContainerItemsComponent } from './components/containerItem/containersItems/containersItems.component';
import { ContainersComponent } from './components/container/containers/containers.component';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingItemsComponent } from './components/shoppingItem/shoppingItems/shoppingItems.component';
import { GroupsComponent } from './components/group/groups/groups.component';
import { InviteConfirmComponent } from './components/inviteConfirm/inviteConfirm.component';
import { RegisterConfirmComponent } from './components/registerConfirm/registerConfirm.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inviteConfirm/:code', component: InviteConfirmComponent },
  { path: 'registerConfirm/:code', component: RegisterConfirmComponent },
  { path: 'register', component: RegisterComponent },
  // { path: '', component: DashboardComponent },
  {
    path: '', component: MainComponent, children: [
      { path: 'container', component: ContainersComponent, },
      { path: 'groups', component: GroupsComponent, },
      { path: 'items', component: ContainerItemsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'shoppinglist', component: ShoppingItemsComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
