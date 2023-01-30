import { User } from 'src/users/entities/user.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  value: string

  @Column()
  description: string

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}
