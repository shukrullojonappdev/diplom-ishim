import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  private workoutsUrl = 'http://localhost:3000/api/workouts'

  constructor(private http: HttpClient) {}

  getWorkouts(): Observable<any[]> {
    return this.http.get<any[]>(this.workoutsUrl)
  }

  createWorkout(workout: any): Observable<any> {
    return this.http.post<any>(this.workoutsUrl, workout)
  }

  addTag(workoutId: any, tagId: any): Observable<any> {
    return this.http.post(`${this.workoutsUrl}/tag`, { workoutId, tagId })
  }

  deleteTag(workoutId: any, tagId: any): Observable<any> {
    return this.http.delete(`${this.workoutsUrl}/tag`, {
      body: { workoutId, tagId },
    })
  }

  removeWorkout(workoutId: any): Observable<any> {
    return this.http.delete(`${this.workoutsUrl}/${workoutId}`)
  }

  updateWorkout(workoutId: any, updatedWorkout: any): Observable<any> {
    return this.http.patch(`${this.workoutsUrl}/${workoutId}`, updatedWorkout)
  }
}
