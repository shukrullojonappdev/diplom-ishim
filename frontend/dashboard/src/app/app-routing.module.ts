import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'
import { JwtGuard } from './core/guards/jwt.guard'
import { LoginComponent } from './pages/login/login.component'
import { RegistrationComponent } from './pages/registration/registration.component'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule),
    canActivate: [JwtGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
