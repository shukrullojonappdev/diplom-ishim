import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private rolesUrl = 'http://localhost:3000/api/roles'

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    return this.http.get(this.rolesUrl)
  }

  createRole(role: any): Observable<any> {
    return this.http.post(this.rolesUrl, role)
  }

  removeRole(roleId: any): Observable<any> {
    return this.http.delete(`${this.rolesUrl}/${roleId}`)
  }

  updateRole(roleId: any, updatedRole: any): Observable<any> {
    return this.http.patch(`${this.rolesUrl}/${roleId}`, updatedRole)
  }
}
