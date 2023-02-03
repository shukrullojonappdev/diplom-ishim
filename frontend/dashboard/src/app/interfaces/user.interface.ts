import Role from './role.interface'
import Workout from './workout.interface'

export default interface User {
  id: number
  username: string
  email: string
  password: string
  refreshToken?: string
  roles?: Role[]
  workouts?: Workout[]
}
