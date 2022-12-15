import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
 

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type : 'mysql',
      host : process.env.MYSQL_HOST,
      port : parseInt(process.env.MYSQL_PORT),
      password : process.env.MYSQL_PASS,
      username : process.env.MYSQL_USER,
      database : process.env.MYSQL_DB,
      entities : [
          User
      ],
      synchronize : true
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}