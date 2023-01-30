import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layers/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./layers/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'tags',
    loadChildren: () =>
      import('./layers/tags/tags.module').then((m) => m.TagsModule),
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./layers/workouts/workouts.module').then((m) => m.WorkoutsModule),
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('./layers/roles/roles.module').then((m) => m.RolesModule),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
