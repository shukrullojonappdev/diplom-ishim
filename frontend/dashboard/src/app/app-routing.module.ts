import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'
import { LoginComponent } from './pages/login/login.component'
import { RegistrationComponent } from './pages/registration/registration.component'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
