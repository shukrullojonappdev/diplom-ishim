import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './modules/material.module'
import { NavListComponent } from './components/nav-list/nav-list.component'
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

@NgModule({
  declarations: [AppComponent, NavListComponent],
  imports: [
    BrowserModule,
    HomeModule,
    UsersModule,
    WorkoutsModule,
    TagsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ workouts: wokroutsReducer }),
    EffectsModule.forRoot([WokroutsEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
