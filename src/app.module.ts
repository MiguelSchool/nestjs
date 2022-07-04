import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmCoreModule} from "@nestjs/typeorm/dist/typeorm-core.module";

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 49153,
      username: 'postgres',
      password: 'postgrespw',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true
    }),
      TasksModule
  ]
})
export class AppModule {}
