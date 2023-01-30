import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent {
  links = ['users', 'workouts', 'tags', 'roles']
}
