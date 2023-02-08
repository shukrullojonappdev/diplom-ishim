import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import User from '../interfaces/user.interface'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = 'http://localhost:3000/api/users'

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
  }

  createUser(user: User | any): Observable<User | any> {
    return this.http.post<User | any>(this.usersUrl, user)
  }

  removeUser(userId: any): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${userId}`)
  }

  addRole(userId: any, roleId: any): Observable<any> {
    return this.http.post(`${this.usersUrl}/role`, { userId, roleId })
  }

  deleteRole(userId: any, roleId: any): Observable<any> {
    return this.http.delete(`${this.usersUrl}/role`, {
      body: { userId, roleId },
    })
  }

  addWorkout(userId: any, workoutId: any): Observable<any> {
    return this.http.post(`${this.usersUrl}/workout`, { userId, workoutId })
  }

  deleteWorkout(userId: any, workoutId: any): Observable<any> {
    return this.http.delete(`${this.usersUrl}/workout`, {
      body: { userId, workoutId },
    })
  }

  updateUser(userId: any, updatedUser: any): Observable<any> {
    return this.http.patch(`${this.usersUrl}/${userId}`, updatedUser)
  }
}
