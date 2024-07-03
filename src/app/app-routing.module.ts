import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (mod) => mod.DashboardModule
      ),
  },
  {
    path: 'edit-user/:id',
    loadChildren: () =>
      import('./pages/edit-user/edit-user.module').then(
        (mod) => mod.EditUserModule
      ),
  },
  {
    path: 'add-user',
    loadChildren: () =>
      import('./pages/create-user/create-user.module').then(
        (mod) => mod.CreateUserModule
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
