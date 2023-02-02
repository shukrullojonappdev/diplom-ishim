import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './modules/material.module'
import { WorkoutsModule } from './layers/workouts/workouts.module'
import { TagsModule } from './layers/tags/tags.module'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { UsersModule } from './layers/users/users.module'
import { HomeModule } from './layers/home/home.module'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { wokroutsReducer } from './redux/reducers/workouts.reducer'
import { EffectsModule } from '@ngrx/effects'
import { WokroutsEffect } from './redux/effects/workouts.effect'
import { LoginModule } from './pages/login/login.module'
import { RegistrationModule } from './pages/registration/registration.module'
import { MainModule } from './pages/main/main.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot({ workouts: wokroutsReducer }),
    EffectsModule.forRoot([WokroutsEffect]),
    LoginModule,
    RegistrationModule,
    MainModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
