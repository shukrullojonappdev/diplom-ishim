import { SelectionModel } from '@angular/cdk/collections'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ChangeTagDialogComponent } from 'src/app/components/change-tag-dialog/change-tag-dialog.component'
import { CreateTagDialogComponent } from 'src/app/components/create-tag-dialog/create-tag-dialog.component'
import Tag from 'src/app/core/interfaces/tag.interface'
import { TagsService } from 'src/app/core/services/tags.service'

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'value', 'edit']

  tags: Tag[]
  selection = new SelectionModel<any>(true, [])

  constructor(private tagsService: TagsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTags()
  }

  getTags() {
    return this.tagsService.getTags().subscribe((_tags) => (this.tags = _tags))
  }

  addTag() {
    const userDialogRef = this.dialog.open(CreateTagDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      minWidth: '280px',
    })
    userDialogRef.afterClosed().subscribe(() => this.getTags())
  }

  editTag(row: any) {
    const tagDialogRef = this.dialog.open(ChangeTagDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      minWidth: '280px',
      data: {
        id: row.id,
        value: row.value,
      },
    })
    tagDialogRef.afterClosed().subscribe(() => this.getTags())
  }

  removeTag() {
    for (let user of this.selection.selected) {
      this.tagsService.removeTag(user.id).subscribe(() => {
        this.getTags()
        this.selection.clear()
      })
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected?.length
    const numRows = this.tags?.length
    return numSelected === numRows
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear()
      return
    }

    this.selection.select(...this.tags)
  }

  checkboxLabel(row?: Tag): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`
  }
}
