import { Role } from 'src/roles/entities/role.entity'
import { Workout } from 'src/workouts/entities/workout.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  refreshToken: string

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable({ name: 'userRoles' })
  roles: Role[]

  @ManyToMany(() => Workout)
  @JoinTable({ name: 'savedWorkouts' })
  workouts: Workout[]
}
