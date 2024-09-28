import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigOptions } from './database';
import { RiderModule } from './modules/riders/rider.module';

@Module({
  imports: [
    // ConfigModule.forRoot({ envFilePath: '.env',isGlobal: true,}),
    TypeOrmModule.forRoot(DbConfigOptions),
    RiderModule
  ],
  
})
export class AppModule {}
