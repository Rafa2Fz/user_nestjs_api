import { Module } from '@nestjs/common';

import { ControllerModule } from './main/controllers/controller.module';
import { DatabaseModule } from './main/config/database/database.module';

@Module({
  imports: [DatabaseModule, ControllerModule],
})
export class AppModule {}
