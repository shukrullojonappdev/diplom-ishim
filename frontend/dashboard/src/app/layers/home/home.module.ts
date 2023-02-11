import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/core/modules/material.module'
import { FindByTagsComponent } from 'src/app/components/find-by-tags/find-by-tags.component'
import { PipesModule } from 'src/app/core/modules/pipes.module'
import { StoreModule } from '@ngrx/store'
import * as fromTags from '../../store/tags/tags.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TagsEffects } from '../../store/tags/tags.effects'

@NgModule({
  declarations: [HomeComponent, FindByTagsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
    StoreModule.forFeature(fromTags.tagsFeatureKey, fromTags.reducer),
    EffectsModule.forFeature([TagsEffects]),
  ],
})
export class HomeModule {}
