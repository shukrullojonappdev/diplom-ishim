import { User } from 'src/users/entities/user.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ unique: true })
  value: string

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}
