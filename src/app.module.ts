import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigOptions } from './database';
import { RiderModule } from './modules/riders/rider.module';
import { TeamModule } from './modules/teams/team.module';
import { CalendarModule } from './modules/calendars/calendar.module';
import { ResultModule } from './modules/results/result.module';
import { AuthModule } from './modules/auths/auth.module';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './modules/uploads/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env',isGlobal: true,}),
    TypeOrmModule.forRoot(DbConfigOptions),
    AuthModule,
    RiderModule,
    TeamModule,
    CalendarModule,
    ResultModule,
    UserModule,
    UploadModule
 
    
  ],
  
})
export class AppModule {}
