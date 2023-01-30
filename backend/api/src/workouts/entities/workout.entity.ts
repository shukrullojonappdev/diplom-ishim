import { Tag } from 'src/tags/entities/tag.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  videoSrc: string

  @ManyToMany(() => Tag, (tag) => tag.workouts, {
    cascade: true,
  })
  @JoinTable({ name: 'workoutTags' })
  tags: Tag[]
}
