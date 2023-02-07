import { Component, HostListener, OnInit } from '@angular/core'
import { WorkoutsService } from 'src/app/core/services/workouts.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  width: number
  workouts: any
  constructor(private workoutsService: WorkoutsService) {}

  ngOnInit(): void {
    this.width = window.innerWidth
    this.workoutsService
      .getWorkouts()
      .subscribe((_workouts) => (this.workouts = _workouts))
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth
  }
}
