import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private rolesUrl = 'http://localhost:3000/api/'

  constructor(private http: HttpClient) {}

  login(payload: any): Observable<any> {
    return this.http.post(`${this.rolesUrl}login`, payload)
  }

  registration(payload: any): Observable<any> {
    return this.http.post(`${this.rolesUrl}registration`, payload)
  }

  logout(id: any): Observable<any> {
    return this.http.post(`${this.rolesUrl}logout`, id)
  }
}
