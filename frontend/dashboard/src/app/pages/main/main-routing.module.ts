import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminGuard } from 'src/app/core/guards/admin.guard'
import { MainComponent } from './main.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../layers/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'saved',
        loadChildren: () =>
          import('../../layers/saved/saved.module').then((m) => m.SavedModule),
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
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
