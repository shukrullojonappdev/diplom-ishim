import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainComponent } from './main.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../layers/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../../layers/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('../../layers/tags/tags.module').then((m) => m.TagsModule),
      },
      {
        path: 'workouts',
        loadChildren: () =>
          import('../../layers/workouts/workouts.module').then(
            (m) => m.WorkoutsModule
          ),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('../../layers/roles/roles.module').then((m) => m.RolesModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
