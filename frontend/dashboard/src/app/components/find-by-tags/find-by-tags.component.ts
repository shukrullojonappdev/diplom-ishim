import { COMMA, ENTER } from '@angular/cdk/keycodes'
import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatChipInputEvent } from '@angular/material/chips'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { TagsService } from 'src/app/core/services/tags.service'

@Component({
  selector: 'app-find-by-tags',
  templateUrl: './find-by-tags.component.html',
  styleUrls: ['./find-by-tags.component.scss'],
})
export class FindByTagsComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA]
  tagCtrl = new FormControl('')
  filteredTags: Observable<string[]>
  tags: string[] = []
  allTags: string[] = []

  @Output() addTagsEvent = new EventEmitter()

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.tagsService.getTags().subscribe((_tags) => {
      _tags.map((e) => this.allTags.push(e.value))
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) =>
          tag ? this._filter(tag) : this.allTags.slice()
        )
      )
    })
  }

  private arrayToString(arr: any[]) {
    return arr.toString()
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim()

    if (value) {
      this.tags.push(value)
      const str = this.arrayToString(this.tags)
      this.addTagsEvent.emit(str)
    }

    event.chipInput!.clear()

    this.tagCtrl.setValue(null)
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag)

    if (index >= 0) {
      this.allTags.push(tag)
      this.tags.splice(index, 1)
      const str = this.arrayToString(this.tags)
      this.addTagsEvent.emit(str)
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) =>
          tag ? this._filter(tag) : this.allTags.slice()
        )
      )
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const index = this.allTags.indexOf(event.option.viewValue)
    if (index >= 0) {
      this.allTags.splice(index, 1)
    }
    this.tags.push(event.option.viewValue)
    const str = this.arrayToString(this.tags)
    this.addTagsEvent.emit(str)
    this.tagInput.nativeElement.value = ''
    this.tagCtrl.setValue(null)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.allTags.filter((tag) => tag.toLowerCase().includes(filterValue))
  }
}
