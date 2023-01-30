import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { SafePipe } from 'src/app/pipes/safe.pipe'
import { StoreModule } from '@ngrx/store'
import { workoutsKey } from 'src/app/redux/selectors/workouts.selector'
import { wokroutsReducer } from 'src/app/redux/reducers/workouts.reducer'

@NgModule({
  declarations: [HomeComponent, SafePipe],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StoreModule.forFeature(workoutsKey, wokroutsReducer),
  ],
})
export class HomeModule {}
