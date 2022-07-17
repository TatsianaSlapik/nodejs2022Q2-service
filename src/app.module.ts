import { Module } from '@nestjs/common';
import { TrackController } from './track/track.controller';
import { TrackModule } from './track/track.module';
import { TrackService } from './track/track.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [UserModule, TrackModule],
  controllers: [UserController, TrackController],
  providers: [UserService, TrackService],
})
export class AppModule {}
