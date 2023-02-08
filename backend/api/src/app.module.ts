import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { TagsModule } from './tags/tags.module'
import { WorkoutsModule } from './workouts/workouts.module'
import { RolesModule } from './roles/roles.module'
import { User } from './users/entities/user.entity'
import { Tag } from './tags/entities/tag.entity'
import { Role } from './roles/entities/role.entity'
import { Workout } from './workouts/entities/workout.entity'
import { AuthModule } from './auth/auth.module'
import { RolesService } from './roles/roles.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Tag, Role, Workout],
      synchronize: true,
    }),
    WorkoutsModule,
    RolesModule,
    TagsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
