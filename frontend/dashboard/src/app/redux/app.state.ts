import Role from '../interfaces/role.interface'
import Tag from '../interfaces/tag.interface'
import User from '../interfaces/user.interface'
import Workout from '../interfaces/workout.interface'

export interface AppState {
  workouts: Workout[]
  tags: Tag[]
  users: User[]
  roles: Role[]
}
