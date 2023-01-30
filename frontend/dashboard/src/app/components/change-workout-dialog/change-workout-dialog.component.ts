import { Component, Inject, OnInit } from '@angular/core'
import { FormArray, FormBuilder } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TagsService } from 'src/app/services/tags.service'
import { WorkoutsService } from 'src/app/services/workouts.service'

@Component({
  selector: 'app-change-workout-dialog',
  templateUrl: './change-workout-dialog.component.html',
  styleUrls: ['./change-workout-dialog.component.scss'],
})
export class ChangeWorkoutDialogComponent implements OnInit {
  workoutFormGroup = this.formBuilder.group({
    name: [this.data.name],
    videoSrc: [this.data.videoSrc],
  })

  tags: any[]

  constructor(
    private workoutsService: WorkoutsService,
    private tagsServise: TagsService,
    private formBuilder: FormBuilder,
    private userDialogRef: MatDialogRef<ChangeWorkoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.tagsServise.getTags().subscribe((_tags) => {
      this.tags = _tags
    })
  }

  setSelect(tag: any) {
    let selected = this.data.tags.some((_tag: any) => _tag.value === tag.value)
    return selected
  }

  editTag(tag: any, selected: any) {
    if (selected) {
      this.workoutsService.addTag(this.data.id, tag.id).subscribe()
    } else {
      this.workoutsService.deleteTag(this.data.id, tag.id).subscribe()
    }
  }

  updateRole() {
    this.workoutFormGroup.patchValue({
      name: this.workoutFormGroup.value.name,
      videoSrc: this.workoutFormGroup.value.videoSrc,
    })

    const editedWorkout = this.workoutFormGroup.value

    this.workoutsService
      .updateWorkout(this.data.id, editedWorkout)
      .subscribe(() => this.userDialogRef.close())
  }

  getTags() {}

  cancelEdit() {
    this.userDialogRef.close()
  }
}
