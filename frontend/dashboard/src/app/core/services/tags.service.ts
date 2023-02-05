import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import Tag from '../interfaces/tag.interface'

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private tagsUrl = 'http://localhost:3000/api/tags'

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl)
  }

  createTag(user: Tag | any): Observable<Tag | any> {
    return this.http.post<Tag | any>(this.tagsUrl, user)
  }

  removeTag(tagId: any): Observable<any> {
    return this.http.delete(`${this.tagsUrl}/${tagId}`)
  }

  updateTag(tagId: any, updatedTag: any): Observable<any> {
    return this.http.patch(`${this.tagsUrl}/${tagId}`, updatedTag)
  }
}
