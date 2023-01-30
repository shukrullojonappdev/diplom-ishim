import { Workout } from 'src/workouts/entities/workout.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  value: string

  @ManyToMany(() => Workout, (workout) => workout.tags)
  workouts: Workout[]
}
